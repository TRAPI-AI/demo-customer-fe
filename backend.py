# Importing necessary libraries
import xml.etree.ElementTree as ET
from lxml import etree
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv
import os

# Initializing Flask app
app = Flask(__name__)
CORS(app)
load_dotenv()


# Running the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
