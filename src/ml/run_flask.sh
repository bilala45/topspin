#!/bin/sh

export FLASK_APP=main.py
export FLASK_ENV=development
flask run -h localhost -p 5002
