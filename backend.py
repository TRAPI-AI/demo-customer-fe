from flask import Flask, request
import requests
import xmltodict
from google.cloud import firestore
from dotenv import load_dotenv
import os

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

    # Assuming response_dict is the root of your parsed XML
    flight_number = response_dict["FlightViewResults"]["Flight"]["FlightId"]["FlightNumber"]
    print("Flight Number:", flight_number)  # Debugging: Print the flight number
    doc_ref = db.collection("flightViewCalls").document(flight_number)
    doc_ref.set(response_dict)  # Store the entire dictionary

    return f"Data for flight {flight_number} saved to Firestore in 'flightViewCalls' collection."

    # curl "http://localhost:5000/fetch-flight-data?acid=BA103&depdate=20240322"