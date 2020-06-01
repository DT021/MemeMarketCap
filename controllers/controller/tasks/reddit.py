from controller import CELERY
from controller.reddit.controller import RedditController
from controller.reddit.classes.redb import RedditReDB
from controller.reddit.functions import get_subs_to_scrape
redb = RedditReDB()

@CELERY.task(name='Reddit')
def Reddit():
    RedditController().update()