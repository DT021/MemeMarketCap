from sqlalchemy.types import ARRAY
from controller.extensions import db

class TrainData(db.Model):
    __tablename__ = 'train_data'
    __bind_key__ = 'memedata'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    features = db.Column(ARRAY(db.Float), nullable=False)
    
class Template(db.Model):
    __tablename__ = 'templates'
    __bind_key__ = 'memedata'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    page = db.Column(db.String(100), nullable=False)