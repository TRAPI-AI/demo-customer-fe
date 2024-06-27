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
        'Subscription-Key': '<INSERT KEY>',
        'Cache-Control': 'no-cache'
    }
    url = "https://api.oag.com/flight-instances/"
    response = requests.get(url, headers=headers, params=params)
    print("JSON Response:", response.text)
    response_dict = response.json()
    print("Parsed Dictionary:", response_dict)

    flights = response_dict.get("data", [])
    flight_data_list = []
    for flight in flights:
        flight_data = {
            "FlightNumber": flight.get("flightNumber"),
            "AirlineCode": flight.get("carrier", {}).get("iata") or flight.get("carrier", {}).get("icao"),
            "DepartureAirportCode": flight.get("departure", {}).get("airport", {}).get("iata") or flight.get("departure", {}).get("airport", {}).get("icao"),
            "ArrivalAirportCode": flight.get("arrival", {}).get("airport", {}).get("iata") or flight.get("arrival", {}).get("airport", {}).get("icao"),
            "ScheduledDeparture": f"{flight.get('departure', {}).get('date', {}).get('local')} {flight.get('departure', {}).get('time', {}).get('local')}",
            "ScheduledArrival": f"{flight.get('arrival', {}).get('date', {}).get('local')} {flight.get('arrival', {}).get('time', {}).get('local')}",
            "Status": flight.get("scheduleInstanceKey"),
            "ServiceType": flight.get("serviceType", {}).get("iata"),
            "DepartureTerminal": flight.get("departure", {}).get("terminal"),
            "ArrivalTerminal": flight.get("arrival", {}).get("terminal"),
        }
        flight_data_list.append(flight_data)

    datetime_str = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    document_name = f"flight_info_v2_req_{datetime_str}"
    doc_ref = db.collection("flightViewCalls").document(document_name)
    doc_ref.set({"flights": flight_data_list})

    return f"Data for flights saved to Firestore in 'flightViewCalls' collection under '{document_name}' document."

if __name__ == "__main__":
    app.run(debug=True, port=5000)
