from controller.reddit.functions import *
from controller.reddit.schema import RedditMeme, RedditScore


class RedditScorer:
    def __init__(self, subreddit):
        self.subreddit = subreddit
        self.redditmeme_min_ts = redditmeme_min_ts(self.subreddit)
        self.redditmeme_max_ts = redditmeme_max_ts(self.subreddit)
        self.redditscore_max_ts = redditscore_max_ts(self.subreddit)

    def scoring_engine(self, interval=HOUR_TD, td=MONTH_TD):
        if not self.redditscore_max_ts:
            self.redditscore_max_ts = round_hour(self.redditmeme_min_ts) + td - interval
        if self.redditscore_max_ts < round_hour(self.redditmeme_max_ts) - interval:
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
