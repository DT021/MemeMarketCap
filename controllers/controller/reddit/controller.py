import json
import time
from itertools import chain
from typing import Any, Dict, Iterator, List, Tuple

import arrow
import numpy as np
import pandas as pd
import keras
import pytesseract
import requests
from billiard import Pool, cpu_count
from keras.applications.vgg16 import VGG16
from pandas.core.frame import DataFrame

import cv2 as cv2
from controller.extensions import db
from controller.reddit.functions.constants import BATCH_SIZE, FULL_SUB_LIST, IMG_CHANNEL, IMG_HEIGHT, IMG_WIDTH, INPUT_SHAPE, MONTH_TD, PUSHSHIFT_URI, THE_BEGINNING
from controller.reddit.functions.database import get_subs_to_scrape, redditmeme_max_ts
from controller.reddit.functions.misc import isDeleted, round_hour_down
from controller.reddit.functions.praw_mp import initializer, praw_by_id
from controller.reddit.schema import RedditMeme, Redditor


def make_request(uri):
    current_tries = 0
    while current_tries < 5:
        try:
            time.sleep(1)
            response = requests.get(uri)
            return json.loads(response.content)
        except:
            time.sleep(1)
            current_tries += 1

def query_pushshift(subreddit, start_at, end_at) -> Iterator[Iterator[str]]:
    SIZE = 500
    n = SIZE
    new_start_at = start_at
    while n == SIZE:
        url = PUSHSHIFT_URI.format(subreddit, new_start_at, end_at, SIZE)
        raw = make_request(url)
        if not raw:
            break
        posts = raw['data']
        new_start_at = posts[-1]['created_utc'] - 10
        n = len(posts)
        yield map(lambda post: post['id'], posts)

vgg16 = VGG16(weights='imagenet', input_shape=INPUT_SHAPE, include_top=False)

class RedditController:
    def stream(
        self,
        subreddit: str,
        start_time: int,
        end_time: int
    ) -> Iterator[List[Dict[str, Any]]]:
        for id_iter in query_pushshift(subreddit, start_time, end_time):
            with Pool(cpu_count(), initializer) as workers:
                yield list(workers.imap_unordered(praw_by_id, id_iter))

    def extraction(
        self,
        data: List[Dict[str, Any]]
    ) -> Iterator[Tuple[Dict[str, Any], np.ndarray]]:
        memes = []
        imgs = []
        for item in data:
            if item and item["username"] != 'None':
                try:
                    resp = requests.get(item["url"], stream=True).raw
                    image = np.asarray(bytearray(resp.read()), dtype=np.uint8)
                    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                    item["meme_text"] = pytesseract.image_to_string(image)
                    image = cv2.resize(image, (IMG_HEIGHT, IMG_WIDTH))
                except:
                    continue
                # if isDeleted(image_cv):
                #     continue
                imgs.append(image)
                memes.append(item)
        return zip(memes, vgg16.predict(np.array(imgs)))

    def engine(self, sub: str, max_ts: int):
        for data in self.stream(sub, max_ts, min(max_ts + MONTH_TD, self.now)):
            max_ts = max(max_ts, max(item["timestamp"] for item in data if item))
            for meme, features in self.extraction(data):
                redditors = db.session.query(Redditor)
                try:
                    redditor = redditors.filter_by(username = meme["username"]).one()
                except:
                    redditor = Redditor(username=meme["username"])
                    db.session.add(redditor)
                    db.session.commit()
                db.session.add(RedditMeme(**meme, subreddit=sub, features=features.flatten().tolist()))
            db.session.commit()
        return max_ts

    def update(self, full: bool = False) -> None:
        self.now = round_hour_down(arrow.utcnow().timestamp)
        subs = FULL_SUB_LIST if full else get_subs_to_scrape()
        for sub in subs:
            max_ts = redditmeme_max_ts(sub)
            if not max_ts:
                max_ts = THE_BEGINNING
            while max_ts <= self.now:
                max_ts = self.engine(sub, max_ts)
