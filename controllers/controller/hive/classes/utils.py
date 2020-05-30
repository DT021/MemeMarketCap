from controller.extensions import db
from controller.hive.schema import Votable
from beem.comment import Comment

def check_for_vote(votes, voter):
        return any(vote['voter'] == voter for vote in votes)

def check_dup(authorperm):
    return db.session.query(Votable).filter_by(authorperm=authorperm).first()

def check_still_votable(authorperm, blockchain):
    post = Comment(authorperm, blockchain_instance=blockchain)
    if not post.is_pending():
        return None
    return post

def get_community(category):
    if 'hive-189111' == category:
        return 'memehub'
    elif 'hive-139531' == category:
        return 'hivedevs'
    else:
        return ''