Based on the Duffel API documentation, here is a Python Flask application that integrates with the Duffel API to create an offer request. This application will run locally on port 5000.

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/create-offer', methods=['POST'])
def create_offer():
    url = "https://api.duffel.com/air/offer_requests"
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
    }
    payload = request.json
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except requests.exceptions.RequestException as err:
        print(f"Error occurred: {err}")
    return response.json()

if __name__ == '__main__':
    app.run(port=5000)
```

Replace `<YOUR_ACCESS_TOKEN>` with your actual access token.

To install the required dependencies, you can use pip, a package installer for Python. You can install the required packages by running the following commands in your terminal:

```bash
# Uncomment the lines below to install the required dependencies
# pip install flask
# pip install flask_cors
# pip install requests
```

Please note that you need to uncomment the lines in the above code to install the dependencies.