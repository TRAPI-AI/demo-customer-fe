# Start of the response

# Importing necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

# Initializing Flask app
app = Flask(__name__)
CORS(app) 


# Running the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)

# End of the response