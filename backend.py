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

    # Log the response content to inspect it
    print("XML Response Content:")
    print(response.text)  # Ensure using response.text to print as string

    try:
        # Parse the XML response
        response_dict = xmltodict.parse(response.content)

        # Check if 'FlightViewResults' is in the response_dict
        if "FlightViewResults" not in response_dict:
            error_message = "Error: 'FlightViewResults' not found in the XML response."
            print(error_message)
            # Log error to Firestore
            doc_ref = db.collection("flightViewCalls").document()
            doc_ref.set({"error": error_message})
            return error_message, 500

        # Continue processing if key exists
        result_message = response_dict["FlightViewResults"]["QueryProcessingStamp"][
            "Result"
        ]["ResultMessage"]
        flight_number = response_dict["FlightViewResults"]["QueryProcessingStamp"][
            "QueryRequest"
        ]["ACID"]

        doc_ref = db.collection("flightViewCalls").document(flight_number)
        doc_ref.set({"result_message": result_message, "flight_number": flight_number})

        return f"Data for flight {flight_number} saved to Firestore in 'flightView' collection."

    except Exception as e:
        # Log exception details to Firestore
        error_message = str(e)
        print(f"An error occurred: {error_message}")
        doc_ref = db.collection("flightViewCalls").document()
        doc_ref.set({"error": error_message})
        return f"An error occurred: {error_message}", 500


if __name__ == "__main__":
    app.run(debug=True)

    # curl "http://localhost:5000/fetch-flight-data?acid=BA103&depdate=20170322"
