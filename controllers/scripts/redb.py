from controller import APP

if __name__ == "__main__":
    from controller.reddit.classes.redb import ReDB
    with APP.app_context():
        ReDB()