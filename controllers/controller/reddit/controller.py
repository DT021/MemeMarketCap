from typing import Any, Dict, Iterator, List, Tuple

import json
import time
import requests
import arrow
import pytesseract
import requests

import numpy as np
import pandas as pd
import cv2 as cv2

from itertools import chain
from billiard import Pool, cpu_count
from keras_applications.vgg16 import VGG16
from pandas.core.frame import DataFrame

from controller.extensions import db
from controller.reddit.functions.constants import MONTH_TD
from controller.reddit.functions.database import get_subs_to_scrape, redditmeme_max_ts
from controller.reddit.functions.misc import isDeleted, round_hour_down
from controller.reddit.functions.mp import initializer, praw_by_id
from controller.reddit.schema import RedditMeme, Redditor

THE_BEGINNING = arrow.get('2020-01-01').timestamp
FULL_SUB_LIST = ["wholesomememes"]
img_height = 224
img_width = 224
img_channel = 3

PUSHSHIFT_URI = r'https://api.pushshift.io/reddit/search/submission?subreddit={}&after={}&before={}&size={}'

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
        posts = make_request(url)['data']
        new_start_at = posts[-1]['created_utc'] - 10
        n = len(posts)
        yield map(lambda post: post['id'], posts)
    raise StopIteration()

class RedditController:
    def __init__(self):
        self.vgg16: VGG16 = VGG16(
            weights='imagenet',
            input_shape=(img_height, img_width, img_channel),
            include_top=False
        )
    def stream(
        self,
        subreddit: str,
        start_time: int,
        end_time: int
    ) -> Iterator[List[Dict[str, Any]]]:
        for post_ids in chain.from_iterable(query_pushshift(subreddit, start_time, end_time)):
            with Pool(cpu_count(), initializer) as workers:
                yield list(workers.imap_unordered(praw_by_id, post_ids))
        raise StopIteration()

    def extraction(
        self,
        data: List[Dict[str, Any]]
    ) -> Tuple[List[Dict[str, Any]], np.ndarray]:
        
        memes = []
        imgs = []
        for item in data:
            if item and item["redditor"]:
                try:
                    resp = requests.get(item["url"], stream=True).raw
                    image_np = np.asarray(bytearray(resp.read()), dtype=np.uint8)
                except:
                    continue
                image_cv = cv2.imdecode(image_np, cv2.COLOR_BGR2RGB)
                if isDeleted(image_cv):
                    continue
                item["meme_text"] = pytesseract.image_to_string(image_cv)
                imgs.extend(cv2.resize(image_cv, (img_height, img_width)))
                memes.extend(item)
        return memes, self.vgg16.predict(np.array(imgs))

    def update(self, full: bool = False) -> None:
        now = round_hour_down(arrow.utcnow().timestamp)
        subs = FULL_SUB_LIST if full else get_subs_to_scrape()
        for sub in subs:
            max_ts = redditmeme_max_ts(sub)
            if not max_ts:
                max_ts = THE_BEGINNING
            while max_ts <= now:
                for data in self.stream(sub, max_ts, max_ts + MONTH_TD):
                    memes, features = self.extraction(data)
                    for meme, features in zip(memes, features):
                        this_redditor = db.session.query(
                            Redditor
                        ).filter_by(
                            username = meme["redditor"]
                        ).one()
                        if not this_redditor:
                            this_redditor = Redditor(username=meme["redditor"])
                            db.session.add(this_redditor)
                        this_redditor.memes.append(RedditMeme(**meme, features=features))
                    db.session.commit()
                    max_ts = max(max_ts, max(item["timestamp"] for item in data))
