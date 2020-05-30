from controller import APP

if __name__ == "__main__":
    from controller.reddit.functions import get_subs_to_scrape
    with APP.app_context():
        print(get_subs_to_scrape())