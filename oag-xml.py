from flask import Flask, request, Response
import xml.etree.ElementTree as ET

app = Flask(__name__)

@app.route('/oag/flightSchedules', methods=['POST', 'GET'])
def manage_flights():
    if request.method == 'POST':
        # Assume XML data is sent in the request body
        try:
            xml_data = ET.fromstring(request.data)
            # Process the XML data, for example, extract flight details
            flight_info = {
                'flight_number': xml_data.find('FlightNumber').text,
                'departure': xml_data.find('Departure').text,
                'arrival': xml_data.find('Arrival').text
            }
            # Here you would typically save or process the flight_info
            print(f"Received flight info: {flight_info}")
            return Response("<Response>Flight data received successfully</Response>", status=200, mimetype='text/xml')
        except ET.ParseError:
            return Response("<Error>Invalid XML format</Error>", status=400, mimetype='text/xml')
    elif request.method == 'GET':
        # For GET, we'll just simulate sending back some XML data
        response_xml = """
        <Flights>
            <Flight>
                <FlightNumber>12345</FlightNumber>
                <Departure>NYC</Departure>
                <Arrival>LAX</Arrival>
            </Flight>
        </Flights>
        """
        return Response(response_xml, mimetype='text/xml')


if __name__ == '__main__':
    app.run(debug=True)
