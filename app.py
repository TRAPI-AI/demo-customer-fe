Here is the Python script for the backend that will call the API provider based on their guide:

```python
import requests

def get_stays_offers():
    url = "https://api.duffel.com/stays/offers"
    headers = {
        'Accept': 'application/json',
        'Duffel-Version': '1.0.0',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    }
    response = requests.get(url, headers=headers)
    return response.json()
```

Please replace 'YOUR_ACCESS_TOKEN' with your actual access token. This function will make a GET request to the Duffel API and return the JSON response.