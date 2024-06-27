import os
import datetime
from flask import Flask, request
import requests
from google.cloud import firestore
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Initialize Firestore client
db = firestore.Client()

@app.route("/fetch-flight-data", methods=["GET"])
def fetch_flight_data():
    acid = request.args.get("acid")
    depdate = request.args.get("depdate")
    username = "trAPI"
    password = "EP5lGF8r5W"
    url = "https://xml.flightview.com/FlightStatusJsonDemo/fvxml.exe"

    params = {
        "acid": acid,
        "depdate": depdate,
        "A": username,
        "B": password
    }
    response = requests.get(url, params=params)
    print("JSON Response:", response.text)  # Debugging: Print the raw JSON response
    response_dict = response.json()
    print("Parsed Dictionary:", response_dict)  # Debugging: Print the parsed dictionary

    # Check if the response contains multiple flights
    flights = response_dict.get("Flights", [])
    flight_data_list = []
    for flight in flights:
        flight_data = {
            "FlightNumber": flight["Acid"]["FlightNumber"],
            "AirlineCode": flight["Acid"]["Airline"]["Code"],
            "DepartureAirportCode": flight["DepartureAirport"]["Code"],
            "ArrivalAirportCode": flight["ArrivalAirport"]["Code"],
            "ScheduledDeparture": flight["ScheduledDeparture"]["Local"],
            "ScheduledArrival": flight["ScheduledArrival"]["Local"],
            "Status": flight["Status"],
            "ServiceType": flight["ServiceType"],
            "DepartureTerminal": flight["DepartureTerminal"],
            "ArrivalTerminal": flight["ArrivalTerminal"],
        }
        flight_data_list.append(flight_data)

    # Generate a datetime string for the document name
    datetime_str = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    document_name = f"flight_info_v2_req_{datetime_str}"

    # Create a single document with all flights data
    doc_ref = db.collection("flightViewCalls").document(document_name)
    doc_ref.set({"flights": flight_data_list})

    return f"Data for flights saved to Firestore in 'flightViewCalls' collection under '{document_name}' document."

if __name__ == "__main__":
    app.run(debug=True)