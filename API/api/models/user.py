from api import db, ma
import time
import uuid

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(50))
    loginname = db.Column(db.String(50))
    password = db.Column(db.String(20))
    email = db.Column(db.String(50))
    phone = db.Column(db.String(50))
    created = db.Column(db.Integer)
    avatar_id = db.Column(db.String(50))
    cover_id = db.Column(db.String(50))

    def __init__(self, username, loginname, password, 
                email, phone, avatar_id, cover_id) -> None:
        super().__init__()
        self.user_id = str(uuid.uuid4())
        self.username = username
        self.loginname = loginname
        self.password = password
        self.email = email
        self.phone = phone
        self.avatar_id = avatar_id
        self.cover_id = cover_id
        self.created = int(time.time())

class UserSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'username', 'loginname', 'created', 'avatar_id', 'cover_id')

user_schema = UserSchema()
users_schema = UserSchema(many=True)
