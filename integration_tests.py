```python
// import necessary libraries
import unittest
from unittest.mock import patch
from flask import Flask
from flask.testing import FlaskClient
import json

// import the Flask app
from app import app

class FlightDataIntegrationTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    @patch('requests.get')
    @patch('google.cloud.firestore.Client')
    def test_fetch_flight_data_success(self, mock_firestore, mock_get):
        // Mock the response from the API
        mock_response = {
            "data": [
                {
                    "flightNumber": "1234",
                    "carrier": {"iata": "AA", "icao": "AAL"},
                    "departure": {
                        "airport": {"iata": "JFK", "icao": "KJFK"},
                        "date": {"local": "2023-10-01"},
                        "time": {"local": "10:00"}
                    },
                    "arrival": {
                        "airport": {"iata": "LAX", "icao": "KLAX"},
                        "date": {"local": "2023-10-01"},
                        "time": {"local": "13:00"}
                    },
                    "scheduleInstanceKey": "On Time",
                    "serviceType": {"iata": "J"},
                    "departureTerminal": "4",
                    "arrivalTerminal": "B"
                }
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response

        // Mock Firestore
        mock_firestore.return_value.collection.return_value.document.return_value.set.return_value = None

        // Make a GET request to the endpoint
        response = self.app.get('/fetch-flight-data?origin=JFK&destination=LAX')

        // Validate the response
        self.assertEqual(response.status_code, 200)
        self.assertIn("Data for flights saved to Firestore", response.data.decode())

    @patch('requests.get')
    def test_fetch_flight_data_api_failure(self, mock_get):
        // Mock the response from the API
        mock_get.return_value.status_code = 500
        mock_get.return_value.json.return_value = {"error": "Internal Server Error"}

        // Make a GET request to the endpoint
        response = self.app.get('/fetch-flight-data?origin=JFK&destination=LAX')

        // Validate the response
        self.assertEqual(response.status_code, 500)

if __name__ == '__main__':
    unittest.main()
```