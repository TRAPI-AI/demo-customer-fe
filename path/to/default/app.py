# Start of the backend route code

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/duffel-flights-search', methods=['POST'])
def duffel_flights_search():
    # Extract the payload from the incoming request
    payload = request.json

    # Define the headers for the Duffel API request
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
    }

    # Endpoint URL
    url = "https://api.duffel.com/air/offer_requests"

    try:
        # Make the POST request to the Duffel API
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an HTTPError if the response status code is 4XX or 5XX
        return jsonify(response.json()), response.status_code
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")  # Print the HTTP error
        # Attempt to parse and return the error response from Duffel, if possible
        try:
            error_response = response.json()
        except ValueError:
            error_response = {"errors": [{"message": "An error occurred, but no additional information is available."}]}
        return jsonify(error_response), response.status_code
    except Exception as e:
        print(f"An error occurred: {e}")  # Print any other error
        return jsonify({"errors": [{"message": "An unexpected error occurred."}]}), 500

if __name__ == '__main__':
    app.run(port=5000)

# End of the backend route code
