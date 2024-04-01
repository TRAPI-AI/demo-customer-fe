Based on the provided information, we can write integration tests for the backend using Python's unittest module and the requests library. Here's a basic example of how you might structure your tests:

```python
import os
import unittest
import requests
from flask import Flask
from your_flask_app import create_offer_request

class TestIntegration(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.client = self.app.test_client()
        self.headers = {
            'Accept-Encoding': 'gzip',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Duffel-Version': 'v1',
            'Authorization': f"Bearer {os.getenv('DUFFEL_ACCESS_TOKEN')}"
        }

    def test_create_offer_request_success(self):
        data = {
            "slices": [{"origin": "LON", "destination": "NYC", "departure_date": "2023-09-01"}],
            "passengers": [{"type": "adult"}]
        }
        response = self.client.post('/api/offer_requests', headers=self.headers, json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('data', response.get_json())

    def test_create_offer_request_fail(self):
        data = {
            "slices": [{"origin": "LON", "destination": "NYC", "departure_date": "2023-09-01"}],
            "passengers": [{"type": "adult"}]
        }
        response = self.client.post('/api/offer_requests', headers=self.headers, json=data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.get_json())

if __name__ == '__main__':
    unittest.main()
```

In this example, we have two tests: `test_create_offer_request_success` and `test_create_offer_request_fail`. The first test checks that a successful request returns a 200 status code and includes 'data' in the response. The second test checks that a failed request returns a 400 status code and includes 'error' in the response.

Please replace `from your_flask_app import create_offer_request` with the actual import statement for your Flask application.

Remember to install the required dependencies for testing:

```bash
pip install unittest2
pip install requests
```