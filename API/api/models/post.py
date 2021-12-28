from api import db, ma
import time
import uuid

class Post(db.Model):
    __tablename__ = 'posts'
    post_id = db.Column(db.String(50), primary_key=True)
    user_id = db.Column(db.String(50))
    image_id = db.Column(db.String(50))
    created = db.Column(db.Integer)
    title = db.Column(db.String(100))
    ingredients = db.Column(db.String(500))
    instructions = db.Column(db.String(500))
    locations = db.Column(db.String(500))

    def __init__(self, user_id, image_id, title, 
                ingredients, instructions, locations) -> None:
        super().__init__()
        self.post_id = str(uuid.uuid4())
        self.user_id = user_id
        self.image_id = image_id,
        self.created = int(time.time())
        self.title = title
        self.ingredients = ingredients
        self.instructions = instructions
        self.locations = locations

class PostSchema(ma.Schema):
    class Meta:
        fields = ('post_id', 'user_id', 'image_id', 'created', 'title', 
                'ingredients', 'instructions', 'locations')

post_schema = PostSchema()
posts_schema = PostSchema(many=True)
