import click
from controller import APP
from controller.reddit.classes import RedditScraper, RedditReDB
from controller.reddit.functions import get_subs_to_scrape
    

@click.group()
def cli():
    """ Run Reddit Related Scripts"""
    pass

@click.command()
@click.argument('sub', default='')
def data_build(sub):
    """ Expand Reddit Meme Database for a Subreddit into the Future """

    with APP.app_context():
        RedditScraper(sub, verbose=True).data_build()

    return None

@click.command()
def update(sub):
    """ Update All Reddit Date With Data Already Up To Yesterday """

    for subreddit in get_subs_to_scrape():
        RedditScraper(subreddit, verbose=True).build()
    RedditReDB().build()

    return None

@click.command()
@click.argument('sub', default='')
def scoring_engine(sub):
    """ Expand Reddit Database for a Subreddit into the Past """

    with APP.app_context():
        RedditScraper(sub, verbose=True).scoring_engine()

    return None

cli.add_command(data_build)
cli.add_command(update)
cli.add_command(scoring_engine)
