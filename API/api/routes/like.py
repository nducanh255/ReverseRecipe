from api import app, db
from flask import request, jsonify
from api.models.like import Like
import sys
import json

@app.route('/like', methods=['POST'])
def like():
    data = json.loads(request.data)
    like_id = data['like_id']
    user_id = data['user_id']
    is_post = data['is_post']

    is_like = Like.query.filter(Like.user_id == user_id).filter(Like.like_id == like_id).all()
    print(is_like, file=sys.stderr)
    for like in is_like:
        print(like.primary_id,  file=sys.stderr)

    if len(is_like) == 0:
        new_like = Like(like_id, user_id, is_post)
        db.session.add(new_like)
        db.session.commit()
        return jsonify('You liked a post or comment.')
    else:
        for like in is_like:
            db.session.delete(like)
            db.session.commit()
        return jsonify('You disliked a post or comment.') 