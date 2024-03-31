```python
# Backend function to integrate with Duffel API provider for searching stays

import requests

def search_stays(access_token, check_in_date, check_out_date, adults, rooms, latitude, longitude, radius):
    url = "https://api.duffel.com/stays/search"
    headers = {
        "Accept-Encoding": "gzip",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Duffel-Version": "v1",
        "Authorization": f"Bearer {access_token}"
    }
    data = {
        "data": {
            "rooms": rooms,
            "location": {
                "radius": radius,
                "geographic_coordinates": {
                    "longitude": longitude,
                    "latitude": latitude
                }
            },
            "check_out_date": check_out_date,
            "check_in_date": check_in_date,
            "adults": adults
        }
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    return response.json()
```