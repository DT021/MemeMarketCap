import random

import arrow
import bcrypt
from faker import Faker

from controller.extensions import db
from controller.generators import Comment, CommentVote, Meme, MemeVote, User

fake = Faker(); Faker.seed(42)

MAX_MEME_VOTES = 50
MAX_MEMES = 5
MAX_COMMENTS = 10
MAX_COMMENT_VOTES = 30
MEME_VOTE_DISTRO = [-1,1,1,1]
COMMENT_VOTE_DISTRO = [-1,-1,1,1,1]

def roll_dice(prob):
    return random.random() < prob

def init_db():
    db.session.query(CommentVote).delete()
    db.session.query(Comment).delete()
    db.session.query(MemeVote).delete()
    db.session.query(Meme).delete()
    db.session.query(User).delete()
    
    db.session.commit()
    me = {
        "username": "jermeek", "email": "jermeek@gmail.com", "createdAt": arrow.utcnow().shift(days=-40).naive,
        "avatar": fake.image_url(), "password": bcrypt.hashpw('123456'.encode('utf-8'), bcrypt.gensalt(10))
    }; db.session.add(User(**me)); db.session.commit()
    userId = db.session.query(User).first().id
    my_meme = {
        "userId": userId, "url": fake.image_url(), "createdAt": arrow.utcnow().shift(days=-40).naive
    }; db.session.add(Meme(**my_meme)); db.session.commit()
    my_comment = {
        "userId": userId, "memeId": db.session.query(Meme).first().id,
        "text": "init", "createdAt": arrow.utcnow().shift(days=-40).naive
    }; db.session.add(Comment(**my_comment)); db.session.commit()
def create_user(t1, t2):
    user = {
        "username": fake.profile()["username"], "email": fake.email(), "createdAt": fake.date_time_between(t1.naive, t2.naive),
        "avatar": fake.image_url(), "password": bcrypt.hashpw(fake.password().encode('utf-8'), bcrypt.gensalt(10))
    }; db.session.add(User(**user))
def post_meme(userId, url, t1, t2):
    meme = {"userId": userId, "url": url,  "createdAt": fake.date_time_between(t1.naive, t2.naive) }
    db.session.add(Meme(**meme))
def vote_meme(AMV, userId, memeId, t1, t2):
    if roll_dice(AMV):
        vote = {
            "userId": userId, "memeId": memeId, "value": random.choice(MEME_VOTE_DISTRO),
            "createdAt": fake.date_time_between(t1.naive, t2.naive)
        }; db.session.add(MemeVote(**vote))
def post_comment(ACP, userId, memeId, t1, t2):
    if roll_dice(ACP):
        comment = {
            "userId": userId, "memeId": memeId, "text": fake.text(),
            "createdAt": fake.date_time_between(t1.naive, t2.naive)
        }; db.session.add(Comment(**comment))
def vote_comment(ACV, userId, commentId, t1, t2):
    if roll_dice(ACV):
        vote = {
            "userId": userId, "commentId": commentId,
            "createdAt": fake.date_time_between(t1.naive, t2.naive),
            "value": random.choice(COMMENT_VOTE_DISTRO)
        }; db.session.add(CommentVote(**vote))
