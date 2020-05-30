from controller import APP
from controller.hive.classes.curator import Curator

if __name__ == "__main__":
    with APP.app_context():
        Curator().comment_streamer()