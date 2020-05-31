

import time

import numpy as np
import pytesseract
import requests

import cv2 as cv2
from controller.reddit.classes.scraper import RedditScraper
from controller.reddit.functions import *
from controller.reddit.functions.database import get_subs_to_scrape
from controller.reddit.functions.misc import round_hour_down

class RedditController:
    def __init__(self):
        self.current_scrapers = [RedditScraper(sub) for sub in get_subs_to_scrape()]
        self.all_scrapers = [RedditScraper(sub) for sub in get_subreddit_list()]

    def meme_constructor(self, data):
        for item in data:
            if not item or not item["redditor"]:
                continue
            else:
                try:
                    resp = requests.get(item["url"], stream=True).raw
                    image_np = np.asarray(bytearray(resp.read()), dtype=np.uint8)
                except:
                    continue
                image_cv = cv2.imdecode(image_np, cv2.COLOR_BGR2RGB)
                item["meme_text"] = pytesseract.image_to_string(image_cv)
                # item["template"] = stonk_market(image_np)
                yield item
    def update(self, full: bool = False):
        now = round_hour_down(int(time.time()))
        scrapers = self.all_scrapers if full else self.current_scrapers
        for scraper in scrapers:
            if not scraper.redditmeme_max_ts:
                scraper.redditmeme_max_ts = THE_BEGINNING
            if (now - scraper.redditmeme_max_ts) < MONTH_TD:
                self.meme_constructor(scraper.engine(scraper.redditmeme_max_ts, now))
            else:
                while scraper.redditmeme_max_ts <= now - MONTH_TD:
                    self.meme_constructor(
                        scraper.engine(
                            scraper.redditmeme_max_ts,
                            scraper.redditmeme_max_ts + MONTH_TD
                        )
                    )
                if not scraper.redditmeme_max_ts == now:
                    self.meme_constructor(
                        scraper.engine(
                            scraper.redditmeme_max_ts,
                            now
                        )
                    )