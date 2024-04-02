from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)


@app.route("/duffel-flights-search", methods=["POST"])
def duffel_flights_search():
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer duffel_test_O6axsBfPB1YFwLk2tVJaNYXiFhITUnItVS8FJEtfpRp",
    }

    payload = request.get_json()
    response = requests.post(
        "https://api.duffel.com/air/offer_requests",
        headers=headers,
        data=json.dumps(payload),
    )

    if response.status_code != 200:
        print("Error:", response.json())
        return jsonify(response.json()), response.status_code

    print("Response:", response.json())
    return jsonify(response.json())


if __name__ == "__main__":
    app.run(port=5000, debug=True)
