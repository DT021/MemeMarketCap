from controller.extensions import db
from sqlalchemy import and_, func
import time

def num_posts(subreddit, start, end):
    from controller.reddit import RedditMeme
    try:
        return (
            db.session.query(RedditMeme).filter(
                and_(
                    start < RedditMeme.timestamp,
                    RedditMeme.timestamp < end,
                    RedditMeme.subreddit == subreddit
                )
            ).count()
        )
    except:
        return None

def percent_change(subreddit, start, end):
    from controller.reddit import RedditMeme
    try:
        current = (
            db.session.query(RedditMeme).filter(
                and_(
                    start < RedditMeme.timestamp,
                    RedditMeme.timestamp < end,
                    RedditMeme.subreddit == subreddit
                )
            ).count()
        )
        previous = (
            db.session.query(RedditMeme).filter(
                and_(
                    (2*start - end) < RedditMeme.timestamp,
                    RedditMeme.timestamp < start,
                    RedditMeme.subreddit == subreddit
                )
            ).count()
        )
        return round(100*(current - previous)/previous, 2)
    except:
        return None

def redditmeme_min_ts(subreddit):
    from controller.reddit import RedditMeme
    try:
        min_ts = int(
            db.session.query(
                db.func.min(RedditMeme.timestamp)
            ).filter_by(
                subreddit=subreddit
            ).scalar()
        )
        return min_ts
    except:
        return None

def redditmeme_max_ts(subreddit):
    from controller.reddit import RedditMeme
    try:
        max_ts = int(
            db.session.query(
                db.func.max(RedditMeme.timestamp)
            ).filter_by(
                subreddit=subreddit
            ).scalar()
        )
        return max_ts
    except:
        return None

def redditscore_min_ts(subreddit):
    from controller.reddit import RedditScore
    try:
        min_ts = int(
            db.session.query(
                db.func.min(RedditScore.timestamp)
            ).filter_by(
                subreddit=subreddit
            ).scalar()
        )
        return min_ts
    except:
        return None

def redditscore_max_ts(subreddit):
    from controller.reddit import RedditScore
    try:
        max_ts = int(
            db.session.query(
                db.func.max(RedditScore.timestamp)
            ).filter_by(
                subreddit=subreddit
            ).scalar()
        )
        return max_ts
    except:
        return None

def get_subs_to_scrape():
    from controllers.controller.reddit import RedditMeme
    try:
        subs = [
            data[0] for data in db.session.query(
                RedditMeme.subreddit
            ).group_by(
                RedditMeme.subreddit
            ).all() if redditscore_max_ts(data[0]) and redditscore_max_ts(data[0]) > int(time.time() - 60*60*24)
        ]
        return subs
    except:
        raise('no subs found')

def get_subreddit_list():
    from controller.reddit import RedditMeme
    try:
        subs = [
            data[0] for data in db.session.query(
                RedditMeme.subreddit
            ).group_by(
                RedditMeme.subreddit
            ).all()
        ]
        return subs
    except:
        raise('no subs found')