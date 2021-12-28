from api import db, ma 
import time
import uuid

class Comment(db.Model):
    __tablename__ = 'comments'
    comment_id = db.Column(db.String(50), primary_key=True)
    post_id = db.Column(db.String(50))
    user_id = db.Column(db.String(50))
    text = db.Column(db.String(500))
    created = db.Column(db.Integer())

    def __init__(self, post_id, user_id, text) -> None:
        super().__init__()
        self.comment_id = str(uuid.uuid4())
        self.post_id = post_id
        self.user_id = user_id
        self.text = text
        self.created = int(time.time())

class CommentSchema(ma.Schema):
    class Meta:
        fields = ('comment_id', 'post_id', 'user_id', 'text', 'created')

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)