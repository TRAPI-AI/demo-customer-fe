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

    # Define the endpoint URL
    url = "https://api.duffel.com/air/offer_requests"

    try:
        # Make the POST request to the Duffel API
        response = requests.post(url, headers=headers, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            # Return the successful response
            return jsonify(response.json()), 200
        else:
            # Log and return the error response
            print("Error in Duffel API request:", response.text)
            error_response = response.json()
            return jsonify(error_response), response.status_code
    except Exception as e:
        # Log any exception that occurs
        print("Exception occurred:", str(e))
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    app.run(port=5000)

# End of the backend route code
