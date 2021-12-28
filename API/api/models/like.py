from api import db
import time
import uuid

class Like(db.Model):
    __tablename__ = 'likes'
    primary_id = db.Column(db.String(50), primary_key=True)
    like_id = db.Column(db.String(50))
    user_id = db.Column(db.String(50))
    is_post = db.Column(db.Boolean)
    created = db.Column(db.Integer)

    def __init__(self, like_id, user_id, is_post) -> None:
        super().__init__()
        self.primary_id = str(uuid.uuid4())
        self.like_id = like_id
        self.user_id = user_id
        self.is_post = is_post
        self.created = int(time.time())
