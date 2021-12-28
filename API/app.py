from api import app
from api.routes import *

app.register_blueprint(routes)
app.config['JSON_AS_ASCII'] = False

if __name__ == '__main__':
    app.run(debug=True)