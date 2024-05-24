from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
from lxml import etree
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)


@app.route("/silverrail-shop-tickets", methods=["POST"])
def silverrail_shop_tickets():
    try:
        # logging.debug("Received XML Data: %s", request.data.decode())
        ns = {
            "soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
            "v2": "http://www.railgds.net/shopping-ws/services/Shopping/v2",
        }
        xml_input = etree.fromstring(request.data)
        origin_nodes = xml_input.xpath("//v2:originTravelPoint/text()", namespaces=ns)
        destination_nodes = xml_input.xpath(
            "//v2:destinationTravelPoint/text()", namespaces=ns
        )
        departure_datetime_nodes = xml_input.xpath(
            "//v2:departureDateTimeWindow/text()", namespaces=ns
        )
        age_nodes = xml_input.xpath("//v2:age/text()", namespaces=ns)

        if not origin_nodes or not destination_nodes or not age_nodes:
            error_message = "<error>Missing required fields in the input XML</error>"
            return Response(error_message, status=400, mimetype="text/xml")

        if not departure_datetime_nodes:
            error_message = (
                "<error>Missing departure date and time in the input XML</error>"
            )
            return Response(error_message, status=400, mimetype="text/xml")

        origin = origin_nodes[0]
        destination = destination_nodes[0]
        age = age_nodes[0]
        departure_datetime = departure_datetime_nodes[0]
        departure_date, departure_time = departure_datetime.split("T")

        xml_payload = f"""
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:shop="http://railgds.net/ws/shopping" xmlns="http://railgds.net/ws/commontypes">
                <soapenv:Header/>
                <soapenv:Body>
                    <shop:pointToPointShoppingRequest>
                        <context>
                            <distributorCode>TRAPI</distributorCode>
                            <pointOfSaleCode>GB</pointOfSaleCode>
                            <channelCode>WEB</channelCode>
                        </context>
                        <shop:pointToPointShoppingQuery>
                            <shop:travelPointPairs>
                                <shop:travelPointPair>
                                    <originTravelPoint type="STATION">{origin}</originTravelPoint>
                                    <destinationTravelPoint type="STATION">{destination}</destinationTravelPoint>
                                    <departureDateTimeWindow>
                                        <date>{departure_date}</date>
                                        <time>{departure_time}</time>
                                    </departureDateTimeWindow>
                                </shop:travelPointPair>
                            </shop:travelPointPairs>
                            <shop:passengerSpecs>
                                <shop:passengerSpec>
                                    <age>{age}</age>
                                </shop:passengerSpec>
                            </shop:passengerSpecs>
                        </shop:pointToPointShoppingQuery>
                    </shop:pointToPointShoppingRequest>
                </soapenv:Body>
            </soapenv:Envelope>
            """
        logging.debug("XML Payload being sent: %s", xml_payload)
        cert_path = "combined_unencrypted.pem"
        headers = {"Content-Type": "text/xml"}
        response = requests.post(
            "https://xml-cert-nex.railgds.net/shopping-ws/services/Shopping/v2",
            data=xml_payload,
            headers=headers,
            cert=cert_path,
        )

        logging.debug(
            "Response from SilverRail API: %s", response.text
        )  # Print the response text

        if response.status_code == 200:
            response_xml = etree.fromstring(response.content)
            price_elements = response_xml.xpath(
                "//shop:pointToPointPrice",
                namespaces={"shop": "http://railgds.net/ws/shopping"},
            )
            # Construct a new XML response with all price elements
            new_response = etree.Element("Prices")
            for elem in price_elements:
                new_response.append(elem)
            return Response(etree.tostring(new_response), mimetype="text/xml")
        else:
            error_message = f"<error>Failed to fetch data from SilverRail API: {response.status_code} - {response.text}</error>"
            return Response(
                error_message, status=response.status_code, mimetype="text/xml"
            )
    except Exception as e:
        logging.exception("An unexpected error occurred: %s", str(e))


if __name__ == "__main__":
    app.run(port=5000, debug=True)
