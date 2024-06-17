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

@app.route('/fetch-flight-data', methods=['GET'])
def fetch_flight_data():
    acid = request.args.get('acid')
    depdate = request.args.get('depdate')
    fv_company_name = 'your_company_name_here'
    url = f"http://xml.flightview.com/{fv_company_name}/fvXML.exe"
    
    params = {
        'acid': acid,
        'depdate': depdate
    }
    
    response = requests.get(url, params=params)
    
    # Parse the XML response
    response_dict = xmltodict.parse(response.content)
    
    # Extract required fields
    result_message = response_dict['FlightViewResults']['QueryProcessingStamp']['Result']['ResultMessage']
    flight_number = response_dict['FlightViewResults']['QueryProcessingStamp']['QueryRequest']['ACID']

    # Send data to Firestore
    doc_ref = db.collection('flights').document(flight_number)
    doc_ref.set({
        'result_message': result_message,
        'flight_number': flight_number
    })
    
    return f"Data for flight {flight_number} saved to Firestore."

if __name__ == '__main__':
    app.run(debug=True)