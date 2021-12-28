import uuid
from api import db, ma
import time
import uuid

class Follower(db.Model):
    __tablename__ = 'followers'
    follow_id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50))
    following_id = db.Column(db.String(50)) # A following B, B has following_id
    created = db.Column(db.Integer)

    def __init__(self, user_id, following_id) -> None:
        super().__init__()
        self.follow_id = str(uuid.uuid4())
        self.user_id = user_id
        self.following_id = following_id
        self.created = int(time.time())

class FollowerSchema(ma.Schema):
    class Meta:
        fields = ('follow_id', 'user_id', 'following_id', 'created')

follower_schema = FollowerSchema()
followers_schema = FollowerSchema(many=True)