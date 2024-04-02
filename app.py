Here is the Python code for the backend route using Flask:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/simtex-esim-search', methods=['POST'])
def simtex_esim_search():
    headers = {
        'X-Api-Key': 'EXpFsls1nhAUp9Tq',
        'accept': 'application/json',
        'content-type': 'application/json'
    }
    url = 'https://api.simtex.io/Quotes'
    payload = request.get_json()

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        print("Response: ", response.json())
        return jsonify(response.json()), 200
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:",errh)
        return jsonify({"error": "HTTP Error"}), 500
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)
        return jsonify({"error": "Connection Error"}), 500
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:",errt)
        return jsonify({"error": "Timeout Error"}), 500
    except requests.exceptions.RequestException as err:
        print ("Something went wrong:",err)
        return jsonify({"error": "An Error Occurred"}), 500

if __name__ == '__main__':
    app.run(port=5000)
```

This code creates a Flask application and defines a POST route '/simtex-esim-search'. It uses the Flask-CORS extension to handle Cross-Origin Resource Sharing (CORS), allowing requests from any origin. The route function makes a POST request to the provided endpoint URL with the provided headers and the payload received in the request. It handles various types of exceptions that can occur during the request and logs the errors. It also logs the response received from the endpoint. The Flask application is run locally on port 5000.