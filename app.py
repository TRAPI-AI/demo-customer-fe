Here is the Python script for the backend using Flask and the requests library. This script will call the Duffel API based on their documentation. It includes error handling and allows all CORS.

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/offer_requests', methods=['POST'])
def create_offer_request():
    try:
        data = request.get_json()
        response = requests.post(
            'https://api.duffel.com/air/offer_requests',
            headers={
                'Accept-Encoding': 'gzip',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Duffel-Version': 'v1',
                'Authorization': f"Bearer {os.getenv('DUFFEL_ACCESS_TOKEN')}"
            },
            json=data
        )
        response.raise_for_status()
        return jsonify(response.json()), 200
    except requests.exceptions.HTTPError as err:
        return jsonify({'error': str(err)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

To install the required dependencies, use the following commands:

```bash
pip install flask
pip install flask-cors
pip install requests
```

Please replace `os.getenv('DUFFEL_ACCESS_TOKEN')` with your actual Duffel access token.