import requests
import arrow
import numpy as np
import cv2 as cv2
import pytesseract
from billiard import Pool, cpu_count

from typing import Any, Dict, Iterator, List

from controller.reddit.functions.constants import MONTH_TD
from controller.reddit.functions.database import get_subs_to_scrape, redditmeme_max_ts
from controller.reddit.functions.misc import isDeleted, chunks, round_hour_down
from controller.reddit.functions.mp import initializer, praw_by_id
from controller.reddit.functions.pushshift import query_pushshift

THE_BEGINNING = arrow.get('2020-01-01').timestamp
FULL_SUB_LIST = ["wholesomememes"]

class RedditController:
    def stream(
        self,
        subreddit: str,
        start_time: int,
        end_time: int
    ) -> Iterator[List[Dict[str, Any]]]:
        post_ids = query_pushshift(subreddit, start_time, end_time)
        num_posts = len(post_ids)
        for chunk in chunks(post_ids, 5000):
            with Pool(cpu_count() if num_posts > 8 else num_posts, initializer) as workers:
                yield list(workers.imap_unordered(praw_by_id, chunk))

    def meme_constructor(
        self,
        data: List[Dict[str, Any]]
    ) -> Iterator[Dict[str, Any]]:
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
                # item["template"] = stonk_market(image_np)
                yield item

    def update(self, full: bool = False) -> None:
        now = round_hour_down(arrow.utcnow().timestamp)
        subs = FULL_SUB_LIST if full else get_subs_to_scrape()
        for sub in subs:
            max_ts = redditmeme_max_ts(sub)
            if not max_ts:
                max_ts = THE_BEGINNING
            while max_ts <= now:
                for data in self.stream(sub, max_ts, max_ts + MONTH_TD):
                    self.meme_constructor(data)
                    max_ts = max(max_ts, max(item["timestamp"] for item in data))
