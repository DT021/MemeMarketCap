from controller import CELERY
from controller.reddit.controller import RedditController
from controller.reddit.redb import RedditReDB
from controller.reddit.scorer import RedditScorer


@CELERY.task(name='Reddit')
def Reddit():
    RedditController().update()
    RedditScorer().update()
    RedditReDB().update()
