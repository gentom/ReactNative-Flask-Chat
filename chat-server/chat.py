#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid
from datetime import datetime
from flask import Flask, request, abort, jsonify


app = Flask(__name__)

users = []
chat = [] # holds message id
messages = dict()

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
    chat.append(id)
    return jsonify(messages)


@app.route("/get/<last_id>", methods=["GET"])
def get(last_id):
    if chat is None or len(chat) == 0:
        return []
    index = get_next_index(last_id) if last_id else 0    
    ids_to_return = chat[index:]
    results = map(lambda x: messages[x], ids_to_return)
    return jsonify(list(results))

@app.route("/update/<last_id>", methods=["GET"])
def update(last_id):
    index = get_next_index(last_id) if last_id else 0
    result = {
        'new_msgs': False 
    }
    if index < len(chat):
        result['new_msgs'] = True
    return jsonify(result)


def get_next_index(last_id):
    try:
        index = chat.index(last_id) + 1
    except ValueError as e:
        abort(400)

if __name__ == '__main__':
    app.run(debug=True, port=8668)