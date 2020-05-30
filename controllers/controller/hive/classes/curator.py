import arrow
from time import sleep
from tqdm import tqdm
from beem.utils import construct_authorperm, addTzInfo
from beem.comment import Comment
from beem.account import Account
from beem.discussions import Query, Discussions
from beem.exceptions import ContentDoesNotExistsException

from controller.extensions import db
from controller.hive.classes.utils import check_dup, check_for_vote, check_still_votable, get_community
from controller.hive.schema import MemehubCommunity, Votable
from controller.hive.classes.settings import (
    hive,
    steem,
    memehubSteem,
    memehubHive,
    blockchainHive,
    blockchainSteem,
    minnows,
    whales,
    whitelist,
    memehub_community_created_block,
)
import json

hiveInstance = hive
steemInstance = steem

class Curator:
    def __init__(self, hive = True):
        self.blockchain = hiveInstance if hive else steemInstance
        self.account = memehubHive if hive else memehubSteem
        self.isHive = hive
    def extract_votable(self, entry):
        if not check_for_vote(entry['active_votes'], 'memehub') and not check_dup(entry['authorperm']):
            db.session.add(Votable(**{
                'authorperm': entry['authorperm'],
                'author': entry['author'],
                'community': get_community(entry['category']),
                'isPost': entry.is_main_post(),
                'isHive': self.isHive,
                'createdAt': arrow.get(entry['created']).datetime
            }))
            db.session.commit()
    def find_votable(self):
        for user in whitelist:
            account = Account(user, blockchain_instance=self.blockchain)
            limit=100
            while limit != 0:
                try:
                    blog_entries = account.get_blog(limit=limit)
                    break
                except:
                    limit -=5
            for entry in blog_entries:
                if user == entry['author'] and entry.is_pending():
                    self.extract_votable(entry)
    def voter(self, levels=[]):
        for level in levels:
            self.vote(level=level)
    def vote(self, level=0):
        if self.account.get_voting_power() < 90: return None
        if level == 0:
            MC = db.session.query(Votable).filter(Votable.community == 'memehub').order_by(Votable.createdAt.asc())
            posts = [check_still_votable(post, self.blockchain) for post in MC]
            weight = 100
        elif level == 1:
            minnows = db.session.query(Votable).filter(Votable.author in minnows).order_by(Votable.createdAt.asc())
            posts =[check_still_votable(post, self.blockchain) for post in minnows]
            weight = 20
        elif level == 2:
            whales = db.session.query(Votable).filter(Votable.author in whales).order_by(Votable.createdAt.asc())
            posts =[check_still_votable(post, self.blockchain) for post in whales]
            weight = 10
        else:
            return None
        for post in posts:
            if self.account.get_voting_power() < 90: break
            post.upvote(weight, voter=self.account)
            db.session.delete(post)
        db.session.commit()

    def engine(self):
        self.find_votable()
        self.vote()

    def comment_streamer(self):
        self.active = False
        for op in blockchainHive.stream(opNames=['comment'], start=memehub_community_created_block):
            found_community = False
            found_votable = False
            no_content = False
            
            authorperm = construct_authorperm(op['author'], op['permlink'])
            try:
                comment = Comment(authorperm, blockchain_instance=self.blockchain)
            except ContentDoesNotExistsException:
                no_content = True
            votable = {
                'authorperm': authorperm,
                'author': comment['author'],
                'isPost': comment.is_main_post(),
                'isHive': self.isHive,
                'createdAt': arrow.get(comment['created']).datetime
            }
            community = get_community(comment['category'])
            if community == 'memehub':
                db.session.add(MemehubCommunity(**votable))
                found_community = True
            votable['community'] = community
            if not self.active:
                if comment.is_pending():
                    self.active = True
            else:
                if not check_for_vote(comment['active_votes'], 'memehub') and not check_dup(authorperm):
                    found_votable = True
                    db.session.add(Votable(**votable))
            db.session.commit()

            print(f"{op['block_num']} - {op['trx_num']}: ", end='')
            if no_content:
                print('No Content', end='')
            else:
                if found_community and found_votable:
                    print('Community Votable')
                elif found_community:
                    print('Community')
                elif found_votable:
                    print('Votable')
                else:
                    print('None')