# Start of the backend route code

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/duffel-flights-search', methods=['POST'])
def duffel_flights_search():
    # Extract the access token from the request headers or body as per your security practices
    access_token = "YOUR_ACCESS_TOKEN"  # Replace YOUR_ACCESS_TOKEN with the actual token

    # Headers for the Duffel API request
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": f"Bearer {access_token}"
    }

    # URL for the Duffel API endpoint
    url = "https://api.duffel.com/air/offer_requests"

    # Payload from the incoming request to be forwarded to the Duffel API
    payload = request.json

    try:
        # Making the POST request to the Duffel API
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raises an HTTPError if the response status code is 4XX or 5XX
        return jsonify(response.json()), response.status_code
    except requests.exceptions.HTTPError as err:
        print(f"HTTP Error: {err}")
        # Extracting error details from the response
        error_response = response.json()
        print(json.dumps(error_response, indent=4))
        return jsonify(error_response), error_response["meta"]["status"]
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.run(port=5000)

# End of the backend route code
