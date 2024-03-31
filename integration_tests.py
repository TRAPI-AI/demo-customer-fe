Based on the provided integration actions and backend endpoint result, here is a Python script for the backend integration tests. This script uses the `unittest` and `requests` libraries to test the `/search` endpoint of the backend.

```python
import unittest
import requests
import json

class TestSearchStays(unittest.TestCase):
    BASE_URL = 'http://localhost:5000/search'
    HEADERS = {
        'Content-Type': 'application/json'
    }

    def test_search_stays_success(self):
        data = {
            "check_in": "2022-12-01",
            "check_out": "2022-12-10",
            "location": "London",
            "guests": 2
        }
        response = requests.post(self.BASE_URL, headers=self.HEADERS, data=json.dumps(data))
        self.assertEqual(response.status_code, 200)
        self.assertTrue('results' in response.json())

    def test_search_stays_failure(self):
        data = {
            "check_in": "2022-12-01",
            "check_out": "2022-12-10",
            "location": "",
            "guests": 2
        }
        response = requests.post(self.BASE_URL, headers=self.HEADERS, data=json.dumps(data))
        self.assertEqual(response.status_code, 400)

    def test_search_stays_invalid_token(self):
        data = {
            "check_in": "2022-12-01",
            "check_out": "2022-12-10",
            "location": "London",
            "guests": 2
        }
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer invalid_token'
        }
        response = requests.post(self.BASE_URL, headers=headers, data=json.dumps(data))
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()
```

This script includes three tests:

1. `test_search_stays_success`: This test checks if the `/search` endpoint returns a 200 status code and a response containing 'results' when valid data is sent.

2. `test_search_stays_failure`: This test checks if the `/search` endpoint returns a 400 status code when invalid data (empty location) is sent.

3. `test_search_stays_invalid_token`: This test checks if the `/search` endpoint returns a 401 status code when an invalid access token is used.

Please replace the `data` and `headers` in the tests with the actual data and headers you want to use for testing.