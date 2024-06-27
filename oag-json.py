
import os
import datetime
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
        'Subscription-Key': '1e6c85c093174e2e84101ee078441a0a',
        'Cache-Control': 'no-cache'
    }
    response = requests.get('https://api.oag.com/flight-instances/', headers=headers, params=params)
    print("JSON Response:", response.text)
    response_data = response.json()
    print("Parsed JSON:", response_data)

    flights = response_data["data"]
    flight_data_list = []
    for flight in flights:
        flight_data = {
            "FlightId": flight["sequenceNumber"],
            "AirlineCode": flight["carrier"]["iata"],
            "AirportCode": flight["arrival"]["airport"]["iata"],
            "ScheduleStatus": flight["scheduleInstanceKey"],
            "SvcType": flight["serviceType"]["iata"],
            "Terminal": flight["arrival"]["terminal"],
            "TailNumber": flight["aircraftType"]["iata"],
        }
        flight_data_list.append(flight_data)

    datetime_str = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    document_name = f"flight_info_v2_req_{datetime_str}"
    doc_ref = db.collection("flightViewCalls").document(document_name)
    doc_ref.set({"flights": flight_data_list})

    return f"Data for flights saved to Firestore in 'flightViewCalls' collection under '{document_name}' document."

if __name__ == "__main__":
    app.run(debug=True, port=5000)
