from controller import APP
from controller.reddit.controller import RedditController


if __name__ == "__main__":
    with APP.app_context():
        RedditController().update(full=True)