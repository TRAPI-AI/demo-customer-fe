# Importing required libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

# Initializing Flask app
app = Flask(__name__)
CORS(app)

# Defining the route
@app.route('/duffel-flights-search', methods=['POST'])
def duffel_flights_search():
    # Defining headers
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
    }

    # Getting the payload from the request
    payload = request.get_json()

    # Making the request to the Duffel API
    response = requests.post('https://api.duffel.com/air/offer_requests', headers=headers, data=json.dumps(payload))

    # Checking if the request was successful
    if response.status_code != 200:
        print("Error:", response.json())
        return jsonify(response.json()), response.status_code

    print("Response:", response.json())
    return jsonify(response.json())

# Running the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)

# This code creates a Flask app with a POST route '/duffel-flights-search' that acts as a proxy to the Duffel API. It handles CORS, error logging, and response handling.