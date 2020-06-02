from controller import CELERY
from controller.reddit.controller import RedditController

@CELERY.task(name='Reddit')
def Reddit():
    RedditController().update()