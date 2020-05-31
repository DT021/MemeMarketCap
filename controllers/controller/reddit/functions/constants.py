from multiprocessing import cpu_count
from decouple import config
from time import mktime
from datetime import datetime

THE_BEGINNING = int(mktime(datetime.strptime("01/01/2020", "%d/%m/%Y").timetuple()))
MONTH_TD = 60*60*24*30
WEEK_TD = 60*60*24*7
DAY_TD = 60*60*24
HOUR_TD = 60*60
FILE_TYPES = [".jpg", ".jpeg", ".png"]
NUM_WORKERS = cpu_count()
NUM_REDDIT_INSTANCES = 8