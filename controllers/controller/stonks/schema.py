from controller.extensions import db

class Template(db.Model):
    __tablename__ = 'templates'
    __bind_key__ = 'memedata'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    imgflip_page = db.Column(db.String(200), nullable=False)
    filename = db.Column(db.String(200))