# Importing necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

# Initializing Flask app
app = Flask(__name__)
CORS(app)


# Defining the route
@app.route("/simtex-esim-search", methods=["POST"])
def simtex_esim_search():
    try:
        # Getting the request data
        data = request.get_json()

        # Defining the headers
        headers = {
            "X-Api-Key": "UtaR8LXYDXqzMBLZ",
            "accept": "application/json",
            "content-type": "application/json",
        }

        # Making the POST request
        response = requests.post(
            "https://api.simtex.io/Quotes", headers=headers, data=json.dumps(data)
        )

        # Checking if the request was successful
        if response.status_code == 200:
            print("Response: ", response.json())
            return jsonify(response.json()), 200
        else:
            print("Error: ", response.json())
            return jsonify(response.json()), response.status_code

    except Exception as e:
        print("Error: ", str(e))
        return jsonify({"error": str(e)}), 500


# Defining the new route
@app.route("/simtex-esim-order", methods=["POST"])
def simtex_esim_order():
    try:
        # Getting the request data
        data = request.get_json()

        # Defining the headers
        headers = {
            "X-Api-Key": "UtaR8LXYDXqzMBLZ",
            "accept": "application/json",
            "content-type": "application/json",
        }

        # Making the POST request
        response = requests.post(
            "https://api.simtex.io/Orders", headers=headers, data=json.dumps(data)
        )

        # Checking if the request was successful
        if response.status_code == 200:
            print("Response: ", response.json())
            return jsonify(response.json()), 200
        else:
            print("Error: ", response.json())
            return jsonify(response.json()), response.status_code

    except Exception as e:
        print("Error: ", str(e))
        return jsonify({"error": str(e)}), 500


# Running the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
