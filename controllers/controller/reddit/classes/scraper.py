import json
import random
import time
from datetime import datetime

import matplotlib.pyplot as plt
import pandas as pd
from billiard import Pool, current_process
from fabulous import text
from sqlalchemy import and_, func
from tqdm import tqdm

from controller.extensions import db
from controller.reddit.functions import *
from controller.reddit.functions.mp import initializer, praw_by_id
from controller.reddit.schema import RedditMeme, RedditScore

class RedditScraper:
    def __init__(self, subreddit: str):
        self.subreddit = subreddit
        self.redditmeme_min_ts = redditmeme_min_ts(self.subreddit)
        self.redditmeme_max_ts = redditmeme_max_ts(self.subreddit)

    def engine(self, start_time: int, end_time: int):
        post_ids = query_pushshift(self.subreddit, start_time, end_time)
        num_posts = len(post_ids)
        for chunk in chunks(post_ids, 5000):
            with Pool(NUM_WORKERS if num_posts > 8 else num_posts, initializer) as workers:
                data_list = list(workers.imap_unordered(praw_by_id, chunk))
            yield data_list
        self.redditmeme_max_ts = end_time