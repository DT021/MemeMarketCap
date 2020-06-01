from controller.reddit.functions.misc import dump_datetime
from sqlalchemy.types import ARRAY

from controller.extensions import db


class Redditor(db.Model):
    __tablename__ = 'redditors'
    __bind_key__ = 'memedata'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    memes = db.relationship('reddit_memes', backref='redditor', lazy=True)
    scores = db.relationship('reddit_scores', backref='redditor', lazy=True)

class RedditMeme(db.Model):
    __tablename__ = 'reddit_memes'
    __bind_key__ = 'memedata'

    id = db.Column(db.Integer, primary_key=True)
    redditor = db.Column(db.String(20), db.ForeignKey('redditor.username'), nullable=False)
    reddit_id = db.Column(db.String(20), nullable=False)
    subreddit = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    meme_text = db.Column(db.String(500))
    template = db.Column(db.String(100))
    timestamp = db.Column(db.Integer, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    upvote_ratio = db.Column(db.Float, nullable=False)
    upvotes = db.Column(db.Integer, nullable=False)
    downvotes = db.Column(db.Integer, nullable=False)
    num_comments = db.Column(db.Integer, nullable=False)
    features = db.Column(ARRAY(db.Float), nullable=False)

    @property
    def serialize(self):
        return {
            "reddit_id": self.reddit_id,
            "subreddit": self.subreddit,
            "title": self.title,
            "redditor": self.redditor,
            "url": self.url,
            "meme_text": self.meme_text,
            "template": self.template,
            "timestamp": self.timestamp,
            "datetime": dump_datetime(self.datetime),
            "upvote_ratio": self.upvote_ratio,
            "upvotes": self.upvotes,
            "downvotes": self.downvotes,
            'num_comments': self.num_comments
        }

class RedditScore(db.Model):
    __tablename__ = 'reddit_scores'
    __bind_key__ = 'memedata'

    id = db.Column(db.Integer, primary_key=True)
    redditor = db.Column(db.String(20), db.ForeignKey('redditor.username'), nullable=False)
    subreddit = db.Column(db.String(50), nullable=False)

    time_delta = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.Integer, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)

    final_score = db.Column(db.Float, nullable=False)
    raw_score = db.Column(db.Float, nullable=False)
    num_in_bottom = db.Column(db.Integer, nullable=False)
    num_in_top = db.Column(db.Integer, nullable=False)
    shitposter_index = db.Column(db.Float, nullable=False)
    highest_upvotes = db.Column(db.Integer, nullable=False)
    hu_score = db.Column(db.Float, nullable=False)
    lowest_ratio = db.Column(db.Float, nullable=False)
        
    @property
    def serialize(self):
        return {
            'redditor': self.redditor,
            'subreddit': self.subreddit,
            'timestamp': self.timestamp,
            'datetime': dump_datetime(self.datetime),
            'final_score': self.final_score,
            'raw_score': self.raw_score,
            'num_in_bottom': self.num_in_bottom,
            'num_in_top': self.num_in_top,
            'shitposter_index': self.shitposter_index,
            'highest_upvotes': self.highest_upvotes,
            'hu_score': self.hu_score,
            'lowest_ratio': self.lowest_ratio,
        }

    @property
    def stats(self):
        return {
            'redditor': self.redditor,
            'final_score': self.final_score,
            'num_in_bottom': self.num_in_bottom,
            'num_in_top': self.num_in_top,
            'shitposter_index': self.shitposter_index,
            'highest_upvotes': self.highest_upvotes,
            'hu_score': self.hu_score,
            'lowest_ratio': self.lowest_ratio,
        }
