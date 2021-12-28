from api import app, db
from flask import request, jsonify
import json

from api.models.follower import Follower, followers_schema

@app.route('/follow', methods=['POST'])
def follow():
    data = json.loads(request.get_data())
    user_id = data['user_id']
    following_id = data['following_id']

    is_following = Follower.query.filter(Follower.user_id == user_id).filter(Follower.following_id == following_id).all()
    print(followers_schema.dump(is_following))

    if len(is_following) == 0:
        new_follower = Follower(user_id, following_id)
        db.session.add(new_follower)
        db.session.commit()
        return jsonify({'result': 'You followed a person.'})
    else:
        for following in is_following:
            db.session.delete(following)
            db.session.commit()
        return jsonify({'result': 'You unfollowed a person.'}) 
    