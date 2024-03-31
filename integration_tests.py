Based on the provided information, here is a Python script using pytest and requests to create integration tests for the backend. This script will test the `/search` endpoint of the backend.

```python
import pytest
import requests
import json

def test_search_flights():
    url = 'http://localhost:5000/search'
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        "origin": "LON",
        "destination": "NYC",
        "departure_date": "2022-12-01",
        "return_date": "2022-12-15"
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    assert response.status_code == 200
    assert 'data' in response.json()

def test_search_flights_no_data():
    url = 'http://localhost:5000/search'
    headers = {
        'Content-Type': 'application/json'
    }
    data = {}
    response = requests.post(url, headers=headers, data=json.dumps(data))
    assert response.status_code == 400

def test_search_flights_invalid_data():
    url = 'http://localhost:5000/search'
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        "origin": "123",
        "destination": "456",
        "departure_date": "2022-12-01",
        "return_date": "2022-12-15"
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    assert response.status_code == 400
```

To run the tests, use the following command:

```bash
pytest test_integration.py
```

Please note that these tests assume that the backend is running locally on port 5000. The tests also assume that the Duffel API will return a 400 status code when it receives invalid data. You may need to adjust these assumptions based on your specific requirements.