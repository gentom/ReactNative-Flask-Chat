#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, abort, jsonify

app = Flask(__name__)

users = []

@app.route("/")
def index():
    return "Hi, This is index page :) \n"

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get('username', None)
    if username is None or username in users:
        abort(403)
    else:
        users.append(username)
        return jsonify({
            'status': 'OK',
            'message': 'Successfully Logged In',
        })

@app.route("/send", methods=["POST"])
def send():
    username = request.json.get('username', None)
    message = request.json.get('message', None)

    if username is None or username not in users:
        abort(401)
    if message is None or message == "":
        abort(400)
    
    id = str(uuid.uuid4())
    messages[id] = {
        'username': username,
        'message': message,
        'timestamp': datetime.now(),
        'id': id,
    }

    return jsonify(messages)



if __name__ == '__main__':
    app.run(debug=True, port=8668)