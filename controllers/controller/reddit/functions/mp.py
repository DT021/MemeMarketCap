from billiard import current_process
from praw.reddit import Submission

from controller.reddit.functions.praw import extract_data, init_reddit

NUM_REDDIT_INSTANCES = 8
reddit_objs = [init_reddit(i) for i in range(8)]
reddit = None

def initializer():
    try:
        pid = current_process().name.split("-", 1)[1].split(":", 1)[1]
        process_id = (int(pid)-1) % NUM_REDDIT_INSTANCES
    except:
        pid = current_process().name.split("-", 1)[1]
        process_id = (int(pid)-1) % NUM_REDDIT_INSTANCES
    worker_id = process_id
    global reddit
    tries = 0
    while True:
        try: reddit = reddit_objs[worker_id]; break
        except:
            try: reddit = init_reddit(worker_id); break
            except:
                worker_id += 1 % NUM_REDDIT_INSTANCES; tries += 1
                if tries > 2 * NUM_REDDIT_INSTANCES: raise Exception('reddit instance error')

def praw_by_id(submission_id):
    try:
        submission: Submission = reddit.submission(id=submission_id)
        if not submission.stickied:
            if any(submission.url.endswith(filetype) for filetype in [".jpg", ".jpeg", ".png"]):
                return extract_data(submission)
    except: pass
