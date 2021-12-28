from flask import Blueprint
routes = Blueprint('routes', __name__)

from .index import *
from .post import *
from .auth import *
from .like import *
from .comment import *
from .follow import *