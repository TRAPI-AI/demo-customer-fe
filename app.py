```python
import requests
import json

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()

    headers = {
        'Accept-Encoding': 'gzip',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>',
    }

    response = requests.post('https://api.duffel.com/stays/search', headers=headers, data=json.dumps(data))

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
```
Please replace `<YOUR_ACCESS_TOKEN>` with your actual access token.