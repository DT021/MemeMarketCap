from controller.extensions import db

class Votable(db.Model):
    __tablename__ = 'votable'
    __bind_key__ = 'hivedata'
    id = db.Column(db.Integer, primary_key=True)

    authorperm = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    community = db.Column(db.String(200), nullable=False)
    isPost = db.Column(db.Boolean, nullable=False)
    isHive = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    
    @property
    def serialize(self):
        return {
            'authorperm': self.authorperm,
            'author': self.author,
            'community': self.community,
            'isPost': self.isPost,
            'isHive': self.isHive,
            'createdAt': self.createdAt
        }

class MemehubCommunity(db.Model):
    __tablename__ = 'memehub_community'
    __bind_key__ = 'hivedata'
    id = db.Column(db.Integer, primary_key=True)

    authorperm = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    isPost = db.Column(db.Boolean, nullable=False)
    isHive = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)

    @property
    def serialize(self):
        return {
            'authorperm': self.authorperm,
            'author': self.author,
            'isPost': self.isPost,
            'isHive': self.isHive,
            'createdAt': self.createdAt
        }