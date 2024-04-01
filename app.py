Based on the Duffel API documentation, here is a Python script using Flask to create a backend that will call the Duffel API. This script will run locally on port 5000 and handle all CORS.

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/offer_requests', methods=['POST'])
def offer_requests():
    url = "https://api.duffel.com/air/offer_requests"
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
    }
    data = request.get_json()
    response = requests.post(url, headers=headers, json=data)
    return jsonify({"code": response.status_code, "data": response.json()}), response.status_code

if __name__ == '__main__':
    app.run(port=5000)
```

Replace `<YOUR_ACCESS_TOKEN>` with your actual access token.

To install the required dependencies, use the following commands:

```bash
pip install flask
pip install flask_cors
pip install requests
```

This script creates a POST endpoint at `/api/offer_requests` that accepts JSON data in the request body. This data is forwarded to the Duffel API. The response from the Duffel API is then returned to the client.