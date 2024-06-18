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


def map_keys(original_data):
    # Mapping of original XML keys to custom Firestore keys
    key_mapping = {
        'FlightId': 'flight_id',
        'FlightNumber': 'flight_number',
        'CommercialAirline': {
            'AirlineCode': 'airline_code',
            'AirlineName': 'airline_name'
        },
        'OrigDate': 'original_date',
        'CodeShares': 'code_shares',
        'Aircraft': {
            'AircraftType': 'aircraft_type',
            'TailNumber': 'tail_number'
        },
        'FlightStatus': 'flight_status',
        'ScheduleStatus': 'schedule_status',
        'Departure': 'departure_info',
        'Arrival': 'arrival_info',
        'SvcType': 'service_type',
        'SchedInfoPresent': 'schedule_info_available',
        'Map': 'tracking_map_url',
        'SeqNum': 'sequence_number',
        'NumLegs': 'number_of_legs',
        'AircraftPreviousFlightLeg': 'previous_flight_leg'
    }

    # Recursive function to apply key mapping
    def apply_mapping(data, mapping):
        if isinstance(data, dict):
            return {mapping.get(k, k): apply_mapping(v, mapping.get(k, k)) if isinstance(v, dict) else v for k, v in data.items()}
        elif isinstance(data, list):
            return [apply_mapping(item, mapping) for item in data]
        else:
            return data

    return apply_mapping(original_data, key_mapping)

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

    # Map keys from the original response to custom keys
    custom_data = map_keys(response_dict["FlightViewResults"]["Flight"])

    flight_number = custom_data['flight_number']
    print("Flight Number:", flight_number)  # Debugging: Print the flight number

    # Store the mapped data in Firestore
    doc_ref = db.collection("flightViewCalls").document(flight_number)
    doc_ref.set(custom_data)  # Store the entire dictionary with custom keys

    return f"Data for flight {flight_number} saved to Firestore with custom field names."



if __name__ == "__main__":
    app.run(debug=True)

    # curl "http://localhost:5000/fetch-flight-data?acid=BA103&depdate=20240322"
