Based on the integration requirements and the Duffel API documentation, here is the code for integration tests for the backend route '/duffel-flights-search':

```python
import unittest
from unittest.mock import patch
from app import app

class TestFlightSearchIntegration(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    @patch('requests.post')
    def test_duffel_flights_search_success(self, mock_post):
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {
            "data": {
                "slices": [
                    {
                        "origin": "LHR",
                        "destination": "JFK",
                        "departure_date": "2022-12-25",
                        "total_amount": 500.00
                    }
                ],
                "offers": [
                    {
                        "total_amount": 500.00
                    }
                ]
            }
        }

        payload = {
            "slices": [
                {
                    "origin": "LHR",
                    "destination": "JFK",
                    "departure_date": "2022-12-25"
                }
            ],
            "passengers": [
                {
                    "family_name": "Doe",
                    "given_name": "John",
                    "loyalty_programme_accounts": [
                        {
                            "account_number": "123456",
                            "airline_iata_code": "BA"
                        }
                    ],
                    "type": "adult"
                }
            ],
            "max_connections": 0,
            "cabin_class": "economy"
        }

        response = self.app.post('/duffel-flights-search', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"total_amount": 500.00', response.data)

    @patch('requests.post')
    def test_duffel_flights_search_failure(self, mock_post):
        mock_post.return_value.status_code = 400
        mock_post.return_value.json.return_value = {"error": "Bad Request"}

        payload = {
            "slices": [
                {
                    "origin": "LHR",
                    "destination": "JFK",
                    "departure_date": "2022-12-25"
                }
            ],
            "passengers": [
                {
                    "family_name": "Doe",
                    "given_name": "John",
                    "loyalty_programme_accounts": [
                        {
                            "account_number": "123456",
                            "airline_iata_code": "BA"
                        }
                    ],
                    "type": "adult"
                }
            ],
            "max_connections": 0,
            "cabin_class": "economy"
        }

        response = self.app.post('/duffel-flights-search', json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'"error": "Bad Request"', response.data)

if __name__ == '__main__':
    unittest.main()
```

These integration tests cover the success and failure scenarios for the '/duffel-flights-search' route in the Flask backend. The tests use mocking to simulate the responses from the Duffel API.