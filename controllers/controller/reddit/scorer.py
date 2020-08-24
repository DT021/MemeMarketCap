import pandas as pd
from datetime import datetime

from sqlalchemy import and_

from controller.extensions import db
from controller.constants import HOUR_TD, MONTH_TD
from controller.reddit.functions.database import (
    get_subs_to_scrape, redditmeme_max_ts,
    redditmeme_min_ts,
    redditscore_max_ts
)
from controller.reddit.functions.dataframe import score_df, score_kwargs_gen
from controller.reddit.functions.misc import round_hour
from controller.reddit.schema import RedditMeme, RedditScore


class RedditScorer:
    def update(self, interval=HOUR_TD, td=MONTH_TD):
        for self.subreddit in get_subs_to_scrape():
            redditmeme_min_ts = redditmeme_min_ts(self.subreddit)
            redditmeme_max_ts = redditmeme_max_ts(self.subreddit)
            redditscore_max_ts = redditscore_max_ts(self.subreddit)
            if not redditscore_max_ts:
                redditscore_max_ts = round_hour(redditmeme_min_ts) + td - interval
            if redditscore_max_ts < round_hour(redditmeme_max_ts) - interval:
                while redditscore_max_ts <= round_hour(redditmeme_max_ts) - interval:
                    next_step = redditscore_max_ts + interval
                    self.score(next_step - td, next_step)
                    redditscore_max_ts = next_step

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
