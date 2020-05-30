import click


@click.group()
def cli():
    """ Calling Celery Tasks """
    pass

@click.command()
@click.argument('sub', default='')
def reddit(sub):
    """ Call Reddit Scrapper Task on Subreddit """

    from controller.reddit.tasks.scraper import subreddit_scrapper_task
    subreddit_scrapper_task.delay(sub)

    return None

cli.add_command(reddit)
