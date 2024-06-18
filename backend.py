import os
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

    # Extracting specific fields from the response
    flight_data = {
        "FlightId": response_dict["FlightViewResults"]["Flight"]["FlightId"],
        "AirlineCode": response_dict["FlightViewResults"]["Flight"][
            "CommercialAirline"
        ]["AirlineCode"],
        "AirportCode": response_dict["FlightViewResults"]["Flight"]["Arrival"][
            "Airport"
        ]["AirportCode"],
        "ScheduleStatus": response_dict["FlightViewResults"]["Flight"][
            "ScheduleStatus"
        ],
        "SvcType": response_dict["FlightViewResults"]["Flight"]["SvcType"],
        "Terminal": response_dict["FlightViewResults"]["Flight"]["Arrival"]["Airport"][
            "Terminal"
        ],
        "TailNumber": response_dict["FlightViewResults"]["Flight"]["Aircraft"][
            "TailNumber"
        ],
    }

    # Create a new document with a random ID
    doc_ref = db.collection("flightViewCalls").document()
    doc_ref.set(flight_data)

    return f"Data for flight {flight_data['FlightId']} saved to Firestore in 'flightViewCalls' collection with document ID {doc_ref.id}."


if __name__ == "__main__":
    app.run(debug=True)

    # curl "http://localhost:5000/fetch-flight-data?acid=BA103&depdate=20240322"
