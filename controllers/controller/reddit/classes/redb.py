from controller.reddit.functions.constants import DAY_TD, MONTH_TD, WEEK_TD
from controller.reddit.functions.database import num_posts, percent_change, redditscore_max_ts, redditscore_min_ts
import redis, json
from sqlalchemy import and_, func
from controller.extensions import db
from controller.reddit import RedditMeme, RedditScore
from controller.reddit.functions import *

class RedditReDB:
    def __init__(self, full=True, build=True):
        self.reconn = redis.StrictRedis(host='rejson', port=6379, db=0)
    def _set(self, name, obj, path='.'):
        self.reconn.execute_command('JSON.SET', name, path, json.dumps(obj))
    @property
    def current(self):
        return [ {"overview": json.loads(self.reconn.execute_command('JSON.GET', "overview", "."))}, {"top_month": json.loads(self.reconn.execute_command('JSON.GET', "top_month", "."))} ]
    @property
    def serialize(self):
        return [ {"overview": self.overview}, {"top_month": self.top_month} ]
    def build(self):
        self.subreddit_list = get_subreddit_list()
        self.overview = { "totals": {"Daily": [], "Weekly": [], "Monthly": [], "Ever": [] }}
        self.top_month = { "data": [] }
        for idx, subreddit in enumerate(self.subreddit_list):
            min_ts, max_ts = redditscore_min_ts(subreddit), redditscore_max_ts(subreddit)
            if max_ts:
                self.overview["totals"]["Daily"].append({
                    "sub": subreddit,
                    "amount": num_posts(subreddit, max_ts - DAY_TD, max_ts),
                    "percent": percent_change(subreddit, max_ts - DAY_TD, max_ts)
                })
                self.overview["totals"]["Weekly"].append({
                    "sub": subreddit,
                    "amount": num_posts(subreddit, max_ts - WEEK_TD, max_ts),
                    "percent": percent_change(subreddit, max_ts - WEEK_TD, max_ts)
                })
                self.overview["totals"]["Monthly"].append({
                    "sub": subreddit,
                    "amount": num_posts(subreddit, max_ts - MONTH_TD, max_ts),
                    "percent": percent_change(subreddit, max_ts - MONTH_TD, max_ts)
                })
                self.overview["totals"]["Ever"].append({
                    "sub": subreddit,
                    "amount": num_posts(subreddit, min_ts, max_ts),
                    "percent": percent_change(subreddit, min_ts, max_ts)
                })
                data = [ data.stats for data in
                    db.session.query(RedditScore).filter(
                        and_(
                            RedditScore.timestamp == max_ts,
                            RedditScore.subreddit == subreddit
                        )
                    ).order_by(RedditScore.final_score.desc()).limit(5).all()
                ]
                self.top_month["data"].append(data)
                for data in self.top_month["data"][idx]:
                    data["sub"]=subreddit
                    data["media"] = (
                        db.session.query(RedditMeme.media).filter(
                            RedditMeme.author == data["author"]
                        ).order_by(func.random()).first()[0]
                    )
            
        self._set('overview', self.overview)
        self._set('top_month', self.top_month)