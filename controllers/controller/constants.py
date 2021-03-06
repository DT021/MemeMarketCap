import arrow

MONTH_TD = 60*60*24*30
WEEK_TD = 60*60*24*7
DAY_TD = 60*60*24
HOUR_TD = 60*60

THE_BEGINNING = arrow.get('2020-08-01').timestamp
FULL_SUB_LIST = ["wholesomememes", "HistoryMemes", "dankmemes", "memes"]
IMG_HEIGHT = 224
IMG_WIDTH = 224
IMG_CHANNEL = 3
BATCH_SIZE = 32
INPUT_SHAPE = (IMG_HEIGHT, IMG_WIDTH, IMG_CHANNEL)

PUSHSHIFT_URI = r'https://api.pushshift.io/reddit/search/submission?subreddit={}&after={}&before={}&size={}'

MODELS_REPO = "controller/stonks/models/"