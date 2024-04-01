Based on the provided information, here is a Python script using pytest and requests to create integration tests for the backend. This script will test the POST endpoint at `/api/offer_requests`.

```python
import pytest
import requests
import json

def test_create_offer_request():
    url = 'http://localhost:5000/api/offer_requests'
    headers = {'Content-Type': 'application/json'}
    data = {
        "data": {
            "type": "offer_request",
            "passengers": [
                {
                    "type": "adult"
                }
            ],
            "slices": [
                {
                    "origin": "JFK",
                    "destination": "LHR",
                    "departure_date": "2022-12-01"
                }
            ]
        }
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    assert response.status_code == 200
    assert 'code' in response.json()
    assert 'data' in response.json()
    assert response.json()['code'] == 200

    offer_request_data = response.json()['data']
    assert 'id' in offer_request_data
    assert 'type' in offer_request_data
    assert offer_request_data['type'] == 'offer_request'
    assert 'passengers' in offer_request_data
    assert 'slices' in offer_request_data

def test_create_offer_request_fail():
    url = 'http://localhost:5000/api/offer_requests'
    headers = {'Content-Type': 'application/json'}
    data = {}

    response = requests.post(url, headers=headers, data=json.dumps(data))

    assert response.status_code == 400
    assert 'code' in response.json()
    assert response.json()['code'] == 400

if __name__ == '__main__':
    pytest.main()
```

This script contains two tests:

1. `test_create_offer_request`: This test sends a POST request to the `/api/offer_requests` endpoint with valid data and checks that the response is as expected.

2. `test_create_offer_request_fail`: This test sends a POST request to the `/api/offer_requests` endpoint with invalid data (an empty JSON object) and checks that the response is a 400 error.

To run the tests, use the following command:

```bash
pytest test_integration.py
```

Please replace the `data` in `test_create_offer_request` with the actual data structure you are using.