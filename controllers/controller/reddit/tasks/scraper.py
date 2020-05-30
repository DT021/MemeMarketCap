from controller import CELERY
from controller.reddit.classes.scraper import RedditScraper
from controller.reddit.classes.redb import RedditReDB
from controller.reddit.functions import get_subs_to_scrape
redb = RedditReDB()

@CELERY.task(name='scrapper.scrape_subreddit_list')
def scrape_subreddit_list():
    for subreddit in get_subs_to_scrape():
        RedditScraper(subreddit).build()
    redb.build()