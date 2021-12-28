from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
env = ''

if env == 'dev':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456@localhost/inverse-cooking'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ippylapxtytkzj:41ed0aed639915456a68a7705761c7c97586bf1afd5e9d8aca433422333f2d65@ec2-18-210-159-154.compute-1.amazonaws.com:5432/d4skutn8ja9vqm'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from api.models.post import *
from api.models.user import *
from api.models.follower import *
from api.models.comment import *
from api.models.like import *