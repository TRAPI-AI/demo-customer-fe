import os
import datetime
from flask import Flask, request
import requests
import xmltodict
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
    fv_company_name = "your_company_name_here"
    url = f"http://xml.flightview.com/{fv_company_name}/fvXML.exe"

    params = {"acid": acid, "depdate": depdate}
    response = requests.get(url, params=params)
    print("XML Response:", response.text)  # Debugging: Print the raw XML response
    response_dict = xmltodict.parse(response.content)
    print("Parsed Dictionary:", response_dict)  # Debugging: Print the parsed dictionary

    # Check if the response contains multiple flights
    flights = response_dict["FlightViewResults"]["Flight"]
    if isinstance(flights, list):
        # Multiple flights in response
        flight_data_list = []
        for flight in flights:
            flight_data = {
                "FlightId": flight["FlightId"],
                "AirlineCode": flight["CommercialAirline"]["AirlineCode"],
                "AirportCode": flight["Arrival"]["Airport"]["AirportCode"],
                "ScheduleStatus": flight["ScheduleStatus"],
                "SvcType": flight["SvcType"],
                "Terminal": flight["Arrival"]["Airport"]["Terminal"],
                "TailNumber": flight["Aircraft"]["TailNumber"],
            }
            flight_data_list.append(flight_data)
    else:
        # Single flight in response
        flight_data_list = [{
            "FlightId": flights["FlightId"],
            "AirlineCode": flights["CommercialAirline"]["AirlineCode"],
            "AirportCode": flights["Arrival"]["Airport"]["AirportCode"],
            "ScheduleStatus": flights["ScheduleStatus"],
            "SvcType": flights["SvcType"],
            "Terminal": flights["Arrival"]["Airport"]["Terminal"],
            "TailNumber": flights["Aircraft"]["TailNumber"],
        }]

    # Generate a datetime string for the document name
    datetime_str = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    document_name = f"flight_info_v2_req_{datetime_str}"

    # Create a single document with all flights data
    doc_ref = db.collection("flightViewCalls").document(document_name)
    doc_ref.set({"flights": flight_data_list})

    return f"Data for flights saved to Firestore in 'flightViewCalls' collection under '{document_name}' document."

if __name__ == "__main__":
    app.run(debug=True)
