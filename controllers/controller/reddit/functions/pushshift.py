import json
import time
import requests

SIZE = 500
URI_TEMPLATE = r'https://api.pushshift.io/reddit/search/submission?subreddit={}&after={}&before={}&size={}'

def make_request(uri):
    current_tries = 0
    while current_tries < 5:
        try:
            time.sleep(1)
            response = requests.get(uri)
            return json.loads(response.content)
        except:
            time.sleep(1)
            current_tries += 1

def query_pushshift(subreddit, start_at, end_at):
    url = URI_TEMPLATE.format(subreddit, start_at, end_at, SIZE)
    post_collections = []
    n = SIZE
    new_start_at = start_at
    while n == SIZE:
        url = URI_TEMPLATE.format(subreddit, new_start_at, end_at, SIZE)
        posts = make_request(url)['data']
        more_posts = list(map(lambda post: post['id'], posts))
        post_collections.extend(more_posts)
        new_start_at = posts[-1]['created_utc'] - 10
        n = len(more_posts)
    return post_collections
