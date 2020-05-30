import time, random, json
import pandas as pd
import matplotlib.pyplot as plt

from tqdm import tqdm
from datetime import datetime

from billiard import Pool, current_process
from sqlalchemy import and_, func
from fabulous import text

from controller.reddit.schema import RedditMeme, RedditScore
from controller.reddit.functions import *
from controller.extensions import db

reddit_objs = [init_reddit(i) for i in range(8)]

def initializer():
    try:
        pid = current_process().name.split("-", 1)[1].split(":", 1)[1]
        process_id = (int(pid)-1) % NUM_REDDIT_INSTANCES
    except:
        pid = current_process().name.split("-", 1)[1]
        process_id = (int(pid)-1) % NUM_REDDIT_INSTANCES
    worker_id = process_id; global reddit; tries = 0
    while True:
        try: reddit = reddit_objs[worker_id]; break
        except:
            try: reddit = init_reddit(worker_id); break
            except:
                worker_id += 1 % NUM_REDDIT_INSTANCES; tries += 1
                if tries > 2 * NUM_REDDIT_INSTANCES: raise('reddit instance error')

def praw_by_id(submission_id):
    try:
        submission = reddit.submission(id=submission_id)
        if not submission.stickied:
            if any(submission.url.endswith(filetype) for filetype in FILE_TYPES):
                return extract_data(submission)
    except: pass

class RedditScraper:
    def __init__(self, subreddit, verbose=False):
        self.subreddit = subreddit
        self.verbose = verbose
        self.redditmeme_min_ts = redditmeme_min_ts(self.subreddit)
        self.redditmeme_max_ts = redditmeme_max_ts(self.subreddit)
        self.redditscore_max_ts = redditscore_max_ts(self.subreddit)

    def data_engine(self, start_time, end_time):
        post_ids = query_pushshift(self.subreddit, start_time, end_time)
        num_posts = len(post_ids)
        for chunk in chunks(post_ids, 5000):
            if self.verbose: print(f'{self.subreddit}: {datetime.now()}')
            if not post_ids: continue
            with Pool(NUM_WORKERS if num_posts > 8 else num_posts, initializer) as workers:
                if self.verbose:
                    data_list = list(tqdm(workers.imap_unordered(praw_by_id, chunk), total=len(chunk)))
                else: data_list = list(workers.imap_unordered(praw_by_id, chunk))
            db.session.add_all(RedditMeme(**data, subreddit=self.subreddit) for data in data_list if data)
            db.session.commit()
        self.redditmeme_max_ts = end_time

    def data_build(self):
        now = round_hour_down(int(time.time()))
        if self.verbose: print(text.Text(f'{self.subreddit}', shadow=True, skew=5))
        if not self.redditmeme_max_ts: self.redditmeme_max_ts = THE_BEGINNING
        if (now - self.redditmeme_max_ts) < MONTH_TD:
            self.data_engine(self.redditmeme_max_ts, now)
            if self.verbose: print(f'Runtime: {time.time() - now}')
        else:
            while self.redditmeme_max_ts <= now - MONTH_TD:
                self.data_engine(self.redditmeme_max_ts, self.redditmeme_max_ts + MONTH_TD)
                if self.verbose: print(f'Runtime: {time.time() - now}')
            if not self.redditmeme_max_ts==now: self.data_engine(self.redditmeme_max_ts, now)
        print('done')

    def build(self, interval=HOUR_TD, td=MONTH_TD):
        if (self.redditmeme_max_ts - self.redditmeme_min_ts) < td: raise('Not enough data')
        while self.redditmeme_max_ts < time.time():
            interval_step = round_hour(self.redditmeme_max_ts)+interval
            self.data_engine(self.redditmeme_max_ts, interval_step)
            self.redditmeme_max_ts = interval_step
        self.scoring_engine(interval=interval, td=td)

    def scoring_engine(self, interval=HOUR_TD, td=MONTH_TD):
        if not self.redditscore_max_ts:
            self.redditscore_max_ts = round_hour(self.redditmeme_min_ts) + td - interval
        if self.redditscore_max_ts > round_hour(self.redditmeme_max_ts) - interval:
            raise('not enough data to even start')
        while self.redditscore_max_ts <= round_hour(self.redditmeme_max_ts) - interval:
            next_step = self.redditscore_max_ts + interval
            self.score(next_step - td, next_step)
            self.redditscore_max_ts = next_step

    def score(self, start_ts, end_ts):
        df = score_df(
            pd.read_sql(
                db.session.query(RedditMeme).filter(
                    and_(start_ts < RedditMeme.timestamp, RedditMeme.timestamp < end_ts)
                ).filter_by(subreddit=self.subreddit).statement, db.session.bind
            )
        )
        db.session.add_all(
            RedditScore(
                **kwargs,
                timestamp = end_ts,
                datetime = datetime.fromtimestamp(end_ts),
                subreddit = self.subreddit,
                td = end_ts - start_ts
            ) for kwargs in score_kwargs_gen(df)
        )
        db.session.commit()