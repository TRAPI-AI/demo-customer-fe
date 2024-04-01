Based on the Duffel API documentation, to integrate with the provider's content via API, you will need to make a POST request to the endpoint `https://api.duffel.com/stays/search` with the required parameters in the request body. The backend function to make the integration work should be a route that handles this POST request.

Here is the Python script for the backend using Flask that will call the Duffel API based on their documentation:

```python
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/search_stays', methods=['POST'])
def search_stays():
    url = "https://api.duffel.com/stays/search"
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": "Bearer <YOUR_ACCESS_TOKEN>"
    }
    data = {
        "data": {
            "rooms": 1,
            "location": {
                "radius": 5,
                "geographic_coordinates": {
                    "longitude": -0.1416,
                    "latitude": 51.5071
                }
            },
            "check_out_date": "2023-06-07",
            "check_in_date": "2023-06-04",
            "adults": 2
        }
    }

    response = requests.post(url, headers=headers, json=data)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(port=5000)
```

To install the required dependencies, you can use the following command:

```bash
pip install Flask requests
```

This Flask app will host the backend locally on port 5000 and provide a route `/search_stays` to search for stays using the Duffel API.