from api import app, db
from flask import request, jsonify
from api.models.comment import Comment, comment_schema, comments_schema
import sys
import json

@app.route('/comment', methods=['POST', 'GET'])
def comment():
    if request.method == 'POST':
        data = json.loads(request.data)
        post_id = data['post_id']
        user_id = data['user_id']
        text = data['text']

        new_comment = Comment(post_id, user_id, text)

        db.session.add(new_comment)
        db.session.commit()

        return comment_schema.jsonify(new_comment)
        
    if request.method == 'GET':
        all_comments = Comment.query.all()
        all_comments = comments_schema.dump(all_comments)
        print(all_comments)
        all_comments.sort(key=lambda comment: comment['created'], reversed=True)
        return jsonify(all_comments)