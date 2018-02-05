#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, abort

app = Flask(__name__)

users = []

@app.route("/")
def index():
    return "Hi, This is index page :) \n"

@app.route("/login", methods=["POST"])
def login():
    username = request.json['username']
    user_taken = username in users
    if user_taken:
        abort(403)
    else:
        users.append(username)
        return 'Successfully logged in'

if __name__ == '__main__':
    app.run(debug=True, port=8668)