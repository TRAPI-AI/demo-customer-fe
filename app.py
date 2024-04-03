Here is a Python code snippet that defines a backend route using Flask:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/duffel-flights-search', methods=['POST'])
def duffel_flights_search():
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
    }

    payload = request.get_json()
    response = requests.post('https://api.duffel.com/air/offer_requests', headers=headers, data=json.dumps(payload))

    if response.status_code != 200:
        print("Error:", response.json())
        return jsonify(response.json()), response.status_code

    print("Response:", response.json())
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

Please replace `<YOUR_ACCESS_TOKEN>` with your actual access token. This code will start a Flask server on port 5000 and define a POST route at `/duffel-flights-search`. It will take the JSON payload from the request, send it to the Duffel API, and return the response. If the response status code is not 200, it will print the error and return the error response.