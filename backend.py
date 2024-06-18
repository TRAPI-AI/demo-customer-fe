import os
from flask import Flask, request
import requests
from google.cloud import firestore
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
db = firestore.Client()

@app.route("/fetch-flight-data", methods=["GET"])
def fetch_flight_data():
    params = request.args.to_dict()
    params['version'] = 'v2'
    headers = {
        'Content-Type': 'application/json',
        'Subscription-Key': 'a2f9d515695d44939321acd6a60dd562',
        'Cache-Control': 'no-cache'
    }
    response = requests.get('https://api.oag.com/flight-instances/', headers=headers, params=params)
    print("JSON Response:", response.json())
    
    data = response.json()['data'][0]
    flight_data = {
        "FlightId": data["sequenceNumber"],
        "AirlineCode": data["carrier"]["iata"],
        "AirportCode": data["arrival"]["airport"]["iata"],
        "ScheduleStatus": data["scheduleInstanceKey"],
        "SvcType": data["serviceType"]["iata"],
        "Terminal": data["arrival"]["terminal"],
        # "TailNumber": data["statusDetails"][0]["equipment"]["aircraftRegistrationNumber"]
    }

    doc_ref = db.collection("flightViewCalls").document()
    doc_ref.set(flight_data)

    return f"Data for flight {flight_data['FlightId']} saved to Firestore in 'flightViewCalls' collection with document ID {doc_ref.id}."

if __name__ == "__main__":
    app.run(debug=True, port=5000)
