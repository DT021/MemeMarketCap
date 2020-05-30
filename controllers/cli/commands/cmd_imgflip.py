import click
from controller import APP
from scripts.templates import build_template_db

@click.group()
def cli():
    """ Run ImgFlip Related Scripts """
    pass

@click.command()
def templates():
    """ Build Database of Meme Templates """

    with APP.app_context():
        build_template_db()

    return None

cli.add_command(templates)

