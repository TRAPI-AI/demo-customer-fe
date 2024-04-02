Based on the provided information, we can write integration tests for the '/simtex-esim-search' endpoint in Python using the pytest and requests libraries. Here is an example of how you might write these tests:

```python
import pytest
import requests
import json

# Define the base URL for the API
BASE_URL = 'http://localhost:5000'

# Define the headers for the API
HEADERS = {
    'X-Api-Key': 'EXpFsls1nhAUp9Tq',
    'accept': 'application/json',
    'content-type': 'application/json'
}

# Define a sample payload for the API
SAMPLE_PAYLOAD = {
    "countryCode": "US",
    "productType": "eSIM",
    "duration": 30
}

def test_simtex_esim_search_success():
    # Make a POST request to the '/simtex-esim-search' endpoint
    response = requests.post(f'{BASE_URL}/simtex-esim-search', headers=HEADERS, data=json.dumps(SAMPLE_PAYLOAD))

    # Assert that the response status code is 200
    assert response.status_code == 200

    # Assert that the response is in JSON format
    assert response.headers['Content-Type'] == 'application/json'

    # Assert that the response contains 'quoteOptions'
    assert 'quoteOptions' in response.json()

def test_simtex_esim_search_failure():
    # Make a POST request to the '/simtex-esim-search' endpoint with an invalid payload
    response = requests.post(f'{BASE_URL}/simtex-esim-search', headers=HEADERS, data=json.dumps({}))

    # Assert that the response status code is 500
    assert response.status_code == 500

    # Assert that the response is in JSON format
    assert response.headers['Content-Type'] == 'application/json'

    # Assert that the response contains 'error'
    assert 'error' in response.json()
```

In these tests, we are making POST requests to the '/simtex-esim-search' endpoint and asserting that the response is as expected. The `test_simtex_esim_search_success` test checks that a successful request returns a 200 status code, a JSON response, and contains 'quoteOptions' in the response. The `test_simtex_esim_search_failure` test checks that a request with an invalid payload returns a 500 status code, a JSON response, and contains 'error' in the response.