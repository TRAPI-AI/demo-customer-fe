```python
import unittest
from unittest.mock import patch
from app import app

class TestIntegration(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    @patch('requests.post')
    def test_create_offer_success(self, mock_post):
        mock_post.return_value.json.return_value = {
            "data": {
                "id": "123456",
                "created_at": "2022-01-01T12:00:00Z",
                "live_mode": True
            }
        }
        payload = {
            "data": {
                "slices": [
                    {
                        "origin": "JFK",
                        "destination": "LAX",
                        "departure_date": "2022-12-25"
                    }
                ],
                "passengers": [
                    {
                        "type": "adult"
                    }
                ]
            }
        }
        response = self.app.post('/create-offer', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['data']['id'], "123456")
        self.assertEqual(response.json['data']['created_at'], "2022-01-01T12:00:00Z")
        self.assertEqual(response.json['data']['live_mode'], True)

    @patch('requests.post')
    def test_create_offer_failure(self, mock_post):
        mock_post.return_value.status_code = 400
        payload = {
            "data": {
                "slices": [
                    {
                        "origin": "JFK",
                        "destination": "LAX",
                        "departure_date": "2022-12-25"
                    }
                ],
                "passengers": [
                    {
                        "type": "adult"
                    }
                ]
            }
        }
        response = self.app.post('/create-offer', json=payload)
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
```