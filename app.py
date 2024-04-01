from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)


@app.route("/create-offer", methods=["POST"])
def create_offer():
    url = "https://api.duffel.com/air/offer_requests"
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer duffel_test_O6axsBfPB1YFwLk2tVJaNYXiFhITUnItVS8FJEtfpRp",
    }
    payload = request.json
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        print(response)
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except requests.exceptions.RequestException as err:
        print(f"Error occurred: {err}")
    return response.json()


if __name__ == "__main__":
    app.run(port=5000)
