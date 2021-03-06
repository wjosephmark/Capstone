from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_heroku import Heroku
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from environs import Env
import os

app = Flask(__name__)
CORS(app)
heroku = Heroku(app)

env = Env()
env.read_env()
# DATABASEURL = env("DATABASE_URL")

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "app.sqlite")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

class Tool(db.Model):
    __tablename__ = "Tools"
    id = db.Column(db.Integer, primary_key=True)
    tool_type = db.Column(db.String(100), nullable=False)
    manufacturer = db.Column(db.String(100), nullable=False)
    site = db.Column(db.String(150), nullable=False)

    def __init__(self, manufacturer, tool_type, site):
        self.tool_type = tool_type
        self.manufacturer = manufacturer
        self.site = site

class ToolSchema(ma.Schema):
    class Meta:
        fields = ('id', 'manufacturer', 'tool_type', 'site')

tool_schema = ToolSchema()
tools_schema = ToolSchema(many=True)

class Site(db.Model):
    __tablename__ = "Site"
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(150), nullable=False)
    superintendent = db.Column(db.String(100), nullable=False)

    def __init__(self, location, superintendent):
        self.location = location
        self.superintendent = superintendent

class SiteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'location', 'superintendent')

site_schema = SiteSchema()
sites_schema = SiteSchema(many=True)

class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

#POST TOOL
@app.route("/add-tool", methods=["POST"])
def add_tool():
    tool_type = request.json["tool_type"]
    manufacturer = request.json["manufacturer"]
    site = request.json["site"]

    new_tool = Tool(manufacturer, tool_type, site)

    db.session.add(new_tool)
    db.session.commit()

    tool = Tool.query.get(new_tool.id)
    return tool_schema.jsonify(tool)

#GET TOOLS
@app.route("/tools", methods=["GET"])
def get_tools():
    all_tools = Tool.query.all()
    result = tools_schema.dump(all_tools)

    return jsonify(result)

#GET TOOL BY ID
@app.route("/tool/<id>", methods=["GET"])
def get_tool(id):
    tool = Tool.query.get(id)

    return tool_schema.jsonify(tool) 

#PATCH TOOL
@app.route("/tool/<id>", methods=["PATCH"])
def update_tool(id):
    tool = Tool.query.get(id)

    new_manufacturer = request.json["manufacturer"]
    new_tool_type = request.json["tool_type"]
    new_site = request.json["site"]

    tool.manufacturer = new_manufacturer
    tool.tool_type = new_tool_type
    tool.site = new_site

    db.session.commit()
    return tool_schema.jsonify(tool)

#DELETE TOOL
@app.route("/delete-tool/<id>", methods=["DELETE"])
def delete_tool(id):
    tool = Tool.query.get(id)

    db.session.delete(tool)
    db.session.commit()

    return jsonify("DELETED!")

#POST SITE
@app.route("/add-site", methods=["POST"])
def add_site():
    location = request.json["location"]
    superintendent = request.json["superintendent"]

    new_site = Site(location, superintendent)

    db.session.add(new_site)
    db.session.commit()

    site = Site.query.get(new_site.id)
    return site_schema.jsonify(site)

#GET SITES
@app.route("/sites", methods=["GET"])
def get_sites():
    all_sites = Site.query.all()
    result = sites_schema.dump(all_sites)

    return jsonify(result)

#GET SITE BY ID
@app.route("/site/<id>", methods=["GET"])
def get_site():
    site = Site.query.get(id)

    return site_schema.jsonify(site)

#PATCH SITE
@app.route("/site/<id>", methods=["PATCH"])
def update_site(id):
    site = Site.query.get(id)

    new_location = request.json["location"]
    new_superintendent = request.json["superintendent"]

    site.location = new_location
    site.superintendent = new_superintendent

    db.session.commit()
    return site_schema.jsonify(site)

#DELETE SITE
@app.route("/delete-site/<id>", methods=["DELETE"])
def delete_site(id):
    site = Site.query.get(id)

    db.session.delete(site)
    db.session.commit()
    return jsonify("DELETED!")

#POST USER
@app.route("/add-user", methods=["POST"])
def add_user():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]


    new_user = User(name, email, password)

    db.session.add(new_user)
    db.session.commit()

    user = User.query.get(new_user.id)
    return user_schema.jsonify(user)

#GET USER
@app.route("/users", methods=["GET"])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)

    return jsonify(result)


#GET ONE USER
@app.route("/user/<id>", methods=["GET"])
def get_user():
    user = User.query.get(id)

    return user_schema.jsonify(user)

#PUT USER
@app.route("/user/<id>", methods=["PUT"])
def update_user(id):
    user = User.query.get(id)

    new_name = request.json["name"]
    new_email = request.json["email"]
    new_password = request.json["password"]

    user.name = new_name
    user.email = new_email
    user.password = new_password
    

    db.session.commit()
    return user_schema.jsonify(user)

@app.route("/")
def get_home():
    return "<h1>Home</h1>"

#DELETE USER
@app.route("/delete-user/<id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)

    db.session.delete(user)
    db.session.commit()

    return jsonify("DELETED!")

if __name__ == "__main__":
    app.run(debug = True)
    # manager.run()