# Start of the response

# Importing necessary libraries
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

# Initializing Flask app
app = Flask(__name__)
CORS(app) 

# New route for Amadeus OAuth
@app.route('/amadeus-oauth', methods=['POST'])
def amadeus_oauth():
    try:
        # Extracting client_id and client_secret from the request
        client_id = request.form['client_id']
        client_secret = request.form['client_secret']

        # Preparing the payload
        payload = {
            'grant_type': 'client_credentials',
            'client_id': 'pikES9IqH0D45qXYpYhby1FGqCSdfDa9',
            'client_secret': 'KIRffc0vfxXQLbry'
        }

        # Defining the headers
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        # Making the request to Amadeus API
        response = requests.post('https://test.api.amadeus.com/v1/security/oauth2/token', headers=headers, data=payload)

        # Logging the request and response
        print("Request Payload: ", payload)
        print("Response: ", response.text)

        # Checking if the request was successful
        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            print("Error: ", response.json())
            return jsonify(response.json()), response.status_code

    except Exception as e:
        print("Error: ", str(e))
        return jsonify({'error': str(e)}), 500

# Running the app
if __name__ == '__main__':
    app.run(port=5000, debug=True)

# End of the response