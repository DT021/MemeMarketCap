from controller import APP
from controller.reddit.classes.scraper import RedditScraper
from controller.reddit.classes.redb import RedditReDB
from controller.reddit.functions import get_subs_to_scrape

if __name__ == "__main__":
    with APP.app_context():
        print('starting')
        for subreddit in get_subs_to_scrape():
            print(subreddit)
            RedditScraper(subreddit, verbose=True).build()
        RedditReDB().build()