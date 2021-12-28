from api import app, db
from flask import json, request, jsonify
from api.models.comment import Comment, comments_schema
from api.models.follower import Follower, followers_schema
from api.models.post import Post, post_schema, posts_schema
from api.models.user import User, user_schema
from api.models.like import Like
from datetime import datetime
import sys

from api.routes.follow import follow

@app.route('/post', methods=['POST', 'GET'])
def post():
    if request.method == 'POST':
        json = eval(request.data)
        user_id = json['user_id']
        image_id = json['image_id'][json['image_id'].rfind('/') + 1:]
        title = json['title']
        ingredients = str(json['ingredients'])
        instructions = 'https://www.cooky.vn/cong-thuc/mi-quang-tom-thit-trung-49623'
        locations = "[{'name': 'Nhà Hàng Hoà Nhã', 'reviewScore': 4.5, 'numReview': 35, 'address': '49 Ng. 50 Đặng Thai Mai, Quảng An, Tây Hồ, Hà Nội', 'phoneNum': '093 959 12 86', 'lat': 21.05632351169002, 'lon': 105.81976372202094}, {'name': 'Hải sản Cô Tô (BỦN Chef)', 'reviewScore': 4.1, 'numReview': 9, 'address': '85 P. Trích Sài, Bưởi, Tây Hồ, Hà Nội', 'phoneNum': '098 925 34 76', 'lat': 21.047340291819474, 'lon': 105.81496675211619}]"
        
        new_post = Post(user_id, image_id, title, ingredients, instructions, locations)
        db.session.add(new_post)
        db.session.commit()

        # return post_schema.jsonify(new_post)
        return jsonify('Bạn đã tạo bài đăng mới.')
    
    if request.method == 'GET':
        all_posts = Post.query.all()
        posts = posts_schema.dump(all_posts)
        for post in posts:
            post['created'] = datetime.fromtimestamp(post['created']).strftime('%d/%m/%Y')
            user = User.query.get(post['user_id'])
            user = user_schema.dump(user)
            post['avatar_id'] = user['avatar_id']
            post['username'] = user['username']
            post['loginname'] = user['loginname']
            likes = Like.query.filter(Like.like_id == post['post_id']).all()
            post['num_likes'] = len(likes)
            comments = Comment.query.filter(Comment.post_id == post['post_id']).all()
            post['num_comments'] = len(comments)
            ingredients = eval(post['ingredients'])
            post['num_ingredients'] = len(ingredients)
            locations = eval(post['locations'])
            post['num_locations'] = len(locations)
            del post['ingredients']
            del post['locations']
            del post['title']
        return jsonify(posts)


@app.route('/posts/<user_id>', methods=['GET'])
def get_posts(user_id):
    if request.method == 'GET':

        # Get all followings
        following_ids = Follower.query.filter(Follower.user_id == user_id).all()
        followings = followers_schema.dump(following_ids)
        all_posts = []
        for following in followings:
            posts = Post.query.filter(Post.user_id == following['following_id'])
            for post in posts:
                all_posts.append(post)
        posts = posts_schema.dump(all_posts)

        # Parse posts
        for post in posts:
            post['created'] = datetime.fromtimestamp(post['created']).strftime('%d/%m/%Y')
            user = User.query.get(post['user_id'])
            user = user_schema.dump(user)
            post['avatar_id'] = user['avatar_id']
            post['username'] = user['username']
            post['loginname'] = user['loginname']
            likes = Like.query.filter(Like.like_id == post['post_id']).all()
            is_like = Like.query.filter(Like.like_id == post['post_id']).filter(Like.user_id == user_id).all()
            if len(is_like) == 0:
                is_like = False
            else:
                is_like = True
            post['is_like'] = is_like
            post['num_likes'] = len(likes)
            comments = Comment.query.filter(Comment.post_id == post['post_id']).all()
            post['num_comments'] = len(comments)
            ingredients = eval(post['ingredients'])
            post['num_ingredients'] = len(ingredients)
            locations = eval(post['locations'])
            post['num_locations'] = len(locations)
            del post['ingredients']
            del post['locations']
            del post['title']
        return jsonify(posts)


@app.route('/post/<id>/<user_id>', methods=['GET'])
def get_post(id, user_id):
    post = Post.query.get(id)
    post = post_schema.dump(post)
    post['ingredients'] = eval(post['ingredients'])
    post['num_ingredients'] = len(post['ingredients'])
    post['locations'] = eval(post['locations'])
    post['num_locations'] = len(post['locations'])
    post['created'] = datetime.fromtimestamp(post['created']).strftime('%d/%m/%Y')

    user = User.query.get(post['user_id'])
    user = user_schema.dump(user)
    post['avatar_id'] = user['avatar_id']

    likes = Like.query.filter(Like.like_id == post['post_id']).all()
    post['num_likes'] = len(likes)

    comments = Comment.query.filter(Comment.post_id == post['post_id']).all()
    comments = comments_schema.dump(comments)
    comments.sort(key=lambda comment: comment['created'], reverse=True)

    for comment in comments:
        del comment['post_id']
        likes = Like.query.filter(Like.like_id == comment['comment_id']).all()
        comment['num_likes'] = len(likes)
        comment_user = User.query.get(comment['user_id'])
        comment_user = user_schema.dump(comment_user)
        comment['avatar_id'] = comment_user['avatar_id']
        comment['username'] = comment_user['username']
        comment['loginname'] = comment_user['loginname']
        comment['created'] = datetime.fromtimestamp(comment['created']).strftime('%d/%m/%Y')
        is_like = Like.query.filter(Like.like_id == comment['comment_id']).filter(Like.user_id == user_id).all()
        if len(is_like) == 0:
            is_like = False
        else:
            is_like = True
        comment['is_like'] = is_like
    post['num_comments'] = len(comments)
    post['comments'] = comments
    del post['post_id']
    return jsonify(post)


@app.route('/helloworld', methods=['GET'])
def hello_world():
    return jsonify('Hello, world')