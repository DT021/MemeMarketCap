from multiprocessing import cpu_count
from decouple import config
from time import mktime
from datetime import datetime

THE_BEGINNING = int(mktime(datetime.strptime("01/01/2020", "%d/%m/%Y").timetuple()))

DATASET_PATH = 'controller/databases/dataset'
DEBUG_REDDIT = True
MONTH_TD = 60*60*24*30
WEEK_TD = 60*60*24*7
DAY_TD = 60*60*24
HOUR_TD = 60*60
FILE_TYPES = [".jpg", ".jpeg", ".png"]
NUM_WORKERS = cpu_count()
NUM_REDDIT_INSTANCES = 8
IN_DEV = config('FLASK_ENV') == 'devolpment'
REDDIT_LOG_PATH = 'controller/logs/reddit_debug.log' if IN_DEV else 'reddit_debug.log'
INFO_LOG_PATH = 'controller/logs/INFO.log' if IN_DEV else 'INFO.log'