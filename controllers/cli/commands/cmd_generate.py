import click
from controller import APP
from controller.generators.classes.simulator import Simulator

@click.group()
def cli():
    """ Run Generator Related Scripts"""
    pass

@click.command()
def dbseed():
    """ Expand Reddit Meme Database for a Subreddit into the Future """

    with APP.app_context():
        Simulator().dbseed()

    return None

cli.add_command(dbseed)
