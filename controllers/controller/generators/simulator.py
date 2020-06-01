import datetime
import io
import random
import sys
import time
import arrow
import bcrypt
import numpy as np
from fabulous import text
from faker import Faker
from sqlalchemy import and_, func, not_

from controller.extensions import db
from controller.generators import Comment, CommentVote, Meme, MemeVote, User
from controller.reddit import RedditMeme
from .settings import *

class Simulator():
    def __init__(self, verbose=True):
        init_db()
        self.verbose = verbose
        self.meme_repo = db.session.query(RedditMeme.media).order_by(func.random()).all()
    def stats_update(self):
        if self.verbose: 
            self.total_users = db.session.query(User).count()
            self.total_memes = db.session.query(Meme).count()
            self.total_meme_votes = db.session.query(MemeVote).count()
            self.total_comments = db.session.query(Comment).count()
            self.total_comment_votes = db.session.query(CommentVote).count()
    def update_user_settings(self):
        self.commentable_memes = db.session.query(Meme.id).filter(
            and_(not_(Meme.comments.any(Comment.userId == self.current_userId)),
            Meme.createdAt < self.t1.naive)
        ).order_by(func.random()).limit(10).all()
        
        user_meme_votes = db.session.query(MemeVote.memeId).filter(
            MemeVote.userId == self.current_userId
        ).all()
        self.votable_memes = db.session.query(Meme.id).filter(
            and_(not_(Meme.userId.in_(user_meme_votes)), Meme.createdAt < self.t1.naive)
        ).order_by(func.random()).limit(100).all()
        user_comment_votes = db.session.query(CommentVote.commentId).filter(
            CommentVote.userId == self.current_userId
        ).all()
        self.votable_comments = db.session.query(Comment.id).filter(
            and_(not_(Comment.userId.in_(user_comment_votes)), Comment.createdAt < self.t1.naive)
        ).order_by(func.random()).limit(30).all()
        total_commentable_memes = len(self.commentable_memes)
        total_votable_memes = len(self.votable_memes)
        total_votable_comments = len(self.votable_comments)
        
        self.ACP = 2/total_commentable_memes if total_commentable_memes else 0
        self.AMV = 40/total_votable_memes if total_votable_memes else 0
        self.ACV = 15/total_votable_comments if total_votable_comments else 0
    def engine(self):
        self.stats_update()
        for _ in range(25,50):
            create_user(self.t1, self.t2)
        for user in db.session.query(User).all():
            self.AUS = 0.4
            if roll_dice(self.AUS): continue
            self.current_userId = user.id; self.update_user_settings()
            for _ in range(random.choice([0,0,0,0,0,1,1,1,1,1,2,2,3,3,4,5])):
                post_meme(self.current_userId, self.meme_repo.pop(), self.t1, self.t2)
            for meme in self.commentable_memes:
                post_comment(self.ACP, self.current_userId, meme[0], self.t1, self.t2)
            for meme in self.votable_memes:
                vote_meme(self.AMV, self.current_userId, meme[0], self.t1, self.t2)
            for comment in self.votable_comments:
                vote_comment(self.ACV, self.current_userId, comment[0], self.t1, self.t2)
            db.session.commit()
    def dbseed(self):
        self.t2 = arrow.utcnow().shift(days=-40); self.t1 = self.t2.shift(days=-1)
        self.rounds_ran = 0
        self.total_runtime = datetime.timedelta(seconds=0)
        while arrow.utcnow() > self.t2:
            now = arrow.utcnow(); self.t2 = self.t2.shift(days=1); self.t1 = self.t1.shift(days=1)
            self.engine(); self.rounds_ran += 1
            self.runtime = arrow.utcnow() - now
            self.total_runtime += self.runtime
            self.print_stats()
        while True:
            now = arrow.utcnow(); self.t2 = arrow.utcnow().shift(hours=-1); self.t1 = arrow.utcnow().shift(hours=-2)
            self.engine(); self.rounds_ran += 1
            self.runtime = arrow.utcnow() - now
            self.total_runtime += self.runtime
            self.print_stats()
            input("Hit Enter to Run Round")
    def print_stats(self):
        if self.verbose:
            print(f"""
            \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n
            {text.Text('Seed Database', shadow=True, skew=5)}\n\n
            Current Time: {self.t1}\n
            Total Users: {self.total_users}\n
            Total Memes: {self.total_memes}\n
            Total Meme Votes: {self.total_meme_votes}\n
            Total Comments: {self.total_comments}\n
            Total Comment Votes: {self.total_comment_votes}\n\n
            Rounds Ran: {self.rounds_ran}\n\n
            Round Runtime: {self.runtime}\n
            Total Runtime: {self.total_runtime}
            \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n
            """, end='')
