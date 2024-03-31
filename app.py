'''OTA'''
import json
import logging
import requests
from flask import Flask, request, jsonify

logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s"
)


app = Flask(__name__)


@app.route("/search", methods=["POST"])
def search():
    '''Search'''
    data = request.get_json()

    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer duffel_test_O6axsBfPB1YFwLk2tVJaNYXiFhITUnItVS8FJEtfpRp",
    }

    response = requests.post(
        "https://api.duffel.com/stays/search", headers=headers, data=json.dumps(data)
    )
    logging.debug(
        f"Received response from external API: {response.status_code}, Body: {response.text}"
    )

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)
