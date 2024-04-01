Based on the Duffel API documentation, here is the integration test code for the backend Flask app to test the `/search_stays` route:

```python
import unittest
from unittest.mock import patch
from app import app

class TestSearchStaysEndpoint(unittest.TestCase):

    @patch('requests.post')
    def test_search_stays_success(self, mock_post):
        mock_post.return_value.json.return_value = {
            "data": {
                "results": [
                    {
                        "rooms": 1,
                        "id": "ssr_0000ASVBuJVLdmqtZDJ4ca",
                        "check_out_date": "2023-05-28",
                        "check_in_date": "2023-05-24",
                        "adults": 2,
                        "accommodation": {
                            "rooms": [
                                {
                                    "rates": [
                                        {
                                            "total_currency": "GBP",
                                            "total_amount": "799.00",
                                            "tax_currency": "GBP",
                                            "tax_amount": "82.23",
                                            "supported_loyalty_programme": "duffel_hotel_group_rewards",
                                            "quantity_available": 12,
                                            "public_currency": "GBP",
                                            "payment_type": "pay_now",
                                            "id": "rat_0000BTVRuKZTavzrZDJ4cb",
                                            "fee_currency": "GBP",
                                            "fee_amount": "50.94",
                                            "due_at_accommodation_currency": "GBP",
                                            "due_at_accommodation_amount": "39.95",
                                            "conditions": [
                                                {
                                                    "title": "Parking",
                                                    "description": "Public parking is available nearby for £15 per day"
                                                }
                                            ],
                                            "cancellation_timeline": [
                                                {
                                                    "refund_amount": "799.00",
                                                    "currency": "GBP",
                                                    "before": "2023-05-23T13:00:00Z"
                                                }
                                            ],
                                            "board_type": "room_only",
                                            "base_currency": "GBP",
                                            "base_amount": "665.83",
                                            "available_payment_methods": [
                                                [
                                                    "balance",
                                                    "card"
                                                ]
                                            ]
                                        }
                                    ],
                                    "photos": [
                                        {
                                            "url": "https://assets.duffel.com/img/stays/image.jpg"
                                        }
                                    ],
                                    "name": "Double Suite",
                                    "beds": [
                                        {
                                            "type": "king",
                                            "count": 2
                                        }
                                    ]
                                }
                            ],
                            "review_score": 8.8,
                            "rating": 3,
                            "photos": [
                                {
                                    "url": "https://assets.duffel.com/img/stays/image.jpg"
                                }
                            ],
                            "phone_number": "+442074938181",
                            "name": "The Ritz London",
                            "location": {
                                "geographic_coordinates": {
                                    "longitude": -0.1416,
                                    "latitude": 51.5071
                                },
                                "address": {
                                    "region": "England",
                                    "postal_code": "W1J 9BR",
                                    "line_one": "150 Piccadilly",
                                    "country_code": "GB",
                                    "city_name": "London"
                                }
                            },
                            "id": "acc_0000AWr2IgADo2rTllJJhI",
                            "email": "reservations@theritzlondon.com",
                            "description": "Ornate quarters, some with grand pianos, in a luxurious hotel offering acclaimed dining & a spa.",
                            "created_at": "2022-12-20T15:21:01Z",
                            "check_in_information": {
                                "check_out_before_time": "11:30",
                                "check_in_after_time": "14:30"
                            },
                            "cheapest_rate_total_amount": "799.00",
                            "cheapest_rate_currency": "GBP",
                            "chain": {
                                "name": "The Ritz-Carlton"
                            },
                            "amenities": [
                                {
                                    "type": "parking",
                                    "description": "Parking"
                                }
                            ]
                        }
                    }
                ],
                "created_at": "2022-12-20T15:21:01Z"
            }
        }

        with app.test_client() as client:
            response = client.post('/search_stays')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, mock_post.return_value.json.return_value)

if __name__ == '__main__':
    unittest.main()
```

This integration test ensures that the `/search_stays` endpoint of the Flask app correctly handles the POST request to the Duffel API and returns the expected response data.