# coding: utf-8
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.schema import FetchedValue
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from controller.extensions import db

class CommentVote(db.Model):
    __tablename__ = 'comment_vote'
    __bind_key__ = 'sitedata'
    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    userId = db.Column(db.ForeignKey('users.id'), nullable=False)
    commentId = db.Column(db.ForeignKey('comments.id'), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    comment = db.relationship('Comment', primaryjoin='CommentVote.commentId == Comment.id', backref='comment_votes')
    user = db.relationship('User', primaryjoin='CommentVote.userId == User.id', backref='comment_votes')



class Comment(db.Model):
    __tablename__ = 'comments'
    __bind_key__ = 'sitedata'
    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    text = db.Column(db.String, nullable=False)
    userId = db.Column(db.ForeignKey('users.id'), nullable=False)
    memeId = db.Column(db.ForeignKey('memes.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    meme = db.relationship('Meme', primaryjoin='Comment.memeId == Meme.id', backref='comments')
    user = db.relationship('User', primaryjoin='Comment.userId == User.id', backref='comments')



class MemeVote(db.Model):
    __tablename__ = 'meme_vote'
    __bind_key__ = 'sitedata'
    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    userId = db.Column(db.ForeignKey('users.id'), nullable=False)
    memeId = db.Column(db.ForeignKey('memes.id'), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    meme = db.relationship('Meme', primaryjoin='MemeVote.memeId == Meme.id', backref='meme_votes')
    user = db.relationship('User', primaryjoin='MemeVote.userId == User.id', backref='meme_votes')



class Meme(db.Model):
    __tablename__ = 'memes'
    __bind_key__ = 'sitedata'
    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    url = db.Column(db.String, nullable=False)
    userId = db.Column(db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    user = db.relationship('User', primaryjoin='Meme.userId == User.id', backref='memes')



class User(db.Model):
    __tablename__ = 'users'
    __bind_key__ = 'sitedata'
    id = db.Column(db.Integer, primary_key=True, server_default=db.FetchedValue())
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    avatar = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    tokenVersion = db.Column(db.Integer, nullable=False, server_default=db.FetchedValue())
    createdAt = db.Column(db.DateTime, nullable=False)
