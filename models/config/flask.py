from decouple import config

DEBUG = False

SECRET_KEY = config('SECRET_KEY')

DB_NAME = config('DB_NAME')
DB_USER = config('DB_USER')
DB_PASS = config('POSTGRES_PASSWORD')
DB_SERVICE = config('DB_SERVICE')
DB_PORT = config('DB_PORT')

SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASS}@{DB_SERVICE}:{DB_PORT}/{DB_NAME}'
SQLALCHEMY_TRACK_MODIFICATIONS = False