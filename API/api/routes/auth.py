from datetime import datetime
from api import app, db
from flask import request, jsonify
from api.models.user import User, user_schema, users_schema
from api.models.follower import Follower, followers_schema
from api.models.post import Post, posts_schema
from api.models.like import Like
from api.models.comment import Comment
import sys
import json

@app.route('/signup', methods=['POST'])
def sign_up():
    json = eval(request.data)
    username = json['username']
    loginname = json['loginname']
    password = json['password']
    confirmPwd = json['confirmPwd']
    email = json['email']
    phone = json['phone']
    avatar_id = ''
    cover_id = ''

    user = User.query.filter_by(loginname=loginname).first()
    if user != None:
        return jsonify('Tên đăng nhập đã tồn tại.')
    elif password != confirmPwd:
        return jsonify('Mật khẩu xác nhận không khớp.')
    else:
        new_user = User(username, loginname, password, email, phone, avatar_id, cover_id)
        db.session.add(new_user)
        db.session.commit()

        return user_schema.jsonify(new_user)

@app.route('/signin', methods=['POST'])
def sign_in():
    json = eval(request.data)
    loginname = json['loginname']
    password = json['password']

    user = User.query.filter_by(loginname=loginname).first()
    
    if user is None:
        return jsonify('Tài khoản không tồn tại. Đăng ký?')
    if user.password == password:
        user = user_schema.dump(user)
        print(user, file=sys.stderr)
        if 'user_id' in user.keys():
            followings = Follower.query.filter(Follower.user_id == user['user_id']).all()
            user['num_following'] = len(followings)

            followers = Follower.query.filter(Follower.following_id == user['user_id']).all()
            user['num_follower'] = len(followers)
        return jsonify(user)
    else:
        return jsonify('Sai mật khẩu.')

@app.route('/user/<id>', methods=['GET', 'PUT'])
def get_user(id):
    if request.method == 'GET':
        user = User.query.get(id)
        user = user_schema.dump(user)

        followings = Follower.query.filter(Follower.user_id == user['user_id']).all()
        followings = followers_schema.dump(followings)
        for following in followings:
            following_user = User.query.filter(User.user_id == following['following_id']).first()
            following_user = user_schema.dump(following_user)
            following['username'] = following_user['username']
            following['user_id'] = following_user['user_id']
            following['loginname'] = following_user['loginname']
            following['avatar_id'] = following_user['avatar_id']
            del following['created']
            del following['follow_id']
            del following['following_id']
        user['following'] = followings
        user['num_following'] = len(followings)

        followers = Follower.query.filter(Follower.following_id == user['user_id']).all()
        followers = followers_schema.dump(followers)
        for follower in followers:
            follower_user = User.query.filter(User.user_id == follower['user_id']).first()
            follower_user = user_schema.dump(follower_user)
            follower['username'] = follower_user['username']
            follower['loginname'] = follower_user['loginname']
            follower['avatar_id'] = follower_user['avatar_id']
            del follower['created']
            del follower['follow_id']
            del follower['following_id']
        user['follower'] = followers
        user['num_follower'] = len(followers)

        posts = Post.query.filter(Post.user_id == user['user_id']).all()
        posts = posts_schema.dump(posts)
        for post in posts:
            post_user = User.query.filter(User.user_id == post['user_id']).first()
            post_user = user_schema.dump(post_user)
            post['username'] = post_user['username']
            post['loginname'] = post_user['loginname']
            post['avatar_id'] = post_user['avatar_id']
            post['created'] = datetime.fromtimestamp(post['created']).strftime('%d/%m/%Y')
            likes = Like.query.filter(Like.like_id == post['post_id']).all()
            is_like = Like.query.filter(Like.like_id == post['post_id']).filter(Like.user_id == id).all()
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
            del post['locations']
            del post['ingredients']
            del post['instructions']
            del post['title']
        user['posts'] = posts

        likes = Like.query.filter(Like.user_id == user['user_id']).filter(Like.is_post == True).all()
        liked_post_ids = []
        for liked_post in likes:
            liked_post_ids.append(liked_post.like_id)
        liked_posts = []
        for idx in set(liked_post_ids):
            liked_posts.append(Post.query.filter(Post.post_id == idx).first())
        liked_posts = posts_schema.dump(liked_posts)
        for post in liked_posts:
            post_user = User.query.filter(User.user_id == post['user_id']).first()
            post_user = user_schema.dump(post_user)
            post['username'] = post_user['username']
            post['loginname'] = post_user['loginname']
            post['avatar_id'] = post_user['avatar_id']
            post['created'] = datetime.fromtimestamp(post['created']).strftime('%d/%m/%Y')
            likes = Like.query.filter(Like.like_id == post['post_id']).all()
            post['num_likes'] = len(likes)
            comments = Comment.query.filter(Comment.post_id == post['post_id']).all()
            post['num_comments'] = len(comments)
            ingredients = eval(post['ingredients'])
            post['num_ingredients'] = len(ingredients)
            locations = eval(post['locations'])
            post['num_locations'] = len(locations)
            del post['locations']
            del post['ingredients']
            del post['instructions']
            del post['title']
        user['liked_posts'] = liked_posts
        return jsonify(user)

    if request.method == 'PUT':
        user = User.query.get(id)
        data = json.loads(request.data)
        if data['avatar_id'] != '':
            avatar_id = data['avatar_id'][data['avatar_id'].rfind('/') + 1: -4]
            user.avatar_id = avatar_id
        if data['cover_id'] != '':
            cover_id = data['cover_id'][data['cover_id'].rfind('/') + 1: -4]
            user.cover_id = cover_id        
        db.session.commit()
        return jsonify('Tài khoản đã được cập nhật.')



@app.route('/users/<user_id>', methods=['GET'])
def get_all_users(user_id):
    users = User.query.filter(User.user_id != user_id).all()
    users = users_schema.dump(users)
    
    following_ids = Follower.query.filter(Follower.user_id == user_id).all()
    followings = followers_schema.dump(following_ids)
    for following in followings:
        for user in users:
            if user['user_id'] == following['following_id']:
                user['is_following'] = True
    for user in users:
        if 'is_following' not in user.keys():
            user['is_following'] = False

    return jsonify(users)