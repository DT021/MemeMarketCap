from datetime import datetime
from praw import Reddit
from json import loads
from decouple import config

def init_reddit(id):
    env_var_key = 'reddit_oauth_'+str(id)
    reddit_oauth = loads(config(env_var_key))
    return Reddit(
        client_id=reddit_oauth['CLIENT_ID'],
        client_secret=reddit_oauth['CLIENT_SECRET'],
        password=reddit_oauth['PASSWORD'],
        user_agent=reddit_oauth['USER_AGENT'],
        username=reddit_oauth['USERNAME']
    )

def extract_data(submission):
    return {
        "reddit_id": submission.id,
        "title": submission.title,
        "author": str(submission.author),
        "timestamp": submission.created_utc,
        "datetime": datetime.fromtimestamp(submission.created_utc),
        "media": submission.url,
        "upvote_ratio": submission.upvote_ratio,
        "upvotes": submission.score,
        "downvotes": round(submission.score / submission.upvote_ratio) - submission.score,
        "nsfw": submission.over_18,
        "num_comments": submission.num_comments
    }