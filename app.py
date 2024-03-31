Based on the Duffel API documentation, here is a Python script using Flask to create a backend that will call the Duffel API. This script will run locally on port 5000 and handle all CORS.

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    headers = {
        'Accept-Encoding': 'gzip',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>',
    }
    response = requests.post('https://api.duffel.com/stays/search', headers=headers, data=json.dumps(data))
    return jsonify(response.json()['data']), response.status_code

if __name__ == '__main__':
    app.run(port=5000)
```

Replace `<YOUR_ACCESS_TOKEN>` with your actual access token.

This script creates a POST endpoint at `/search` that accepts JSON data in the request body. It then forwards this data to the Duffel API and returns the response.

To install the required dependencies, use the following commands:

```bash
pip install flask
pip install flask_cors
pip install requests
```

Please note that this script does not include any error handling or validation of the input data. You may want to add this depending on your specific requirements.