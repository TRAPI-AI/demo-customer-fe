"""Backend"""

from flask_cors import CORS
from flask import Flask, jsonify

app = Flask(__name__)
CORS(app)


@app.route("/api/test", methods=["GET"])
def test():
    """Test"""
    return jsonify({"message": "Hello from the backend!"}), 200


if __name__ == "__main__":
    app.run(debug=True)
