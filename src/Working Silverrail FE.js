import React, { useState, useEffect } from "react";

const Trains = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [age, setAge] = useState(28);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(null);
  const [prices, setPrices] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const departureTimeWithSeconds = `${departureTime}:00`;
    const xmlPayload = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v2="http://www.railgds.net/shopping-ws/services/Shopping/v2">
      <soapenv:Header>
        <v2:Context>
          <v2:distributorCode></v2:distributorCode>
          <v2:pointOfSaleCode></v2:pointOfSaleCode>
          <v2:channelCode></v2:channelCode>
        </v2:Context>
      </soapenv:Header>
      <soapenv:Body>
        <v2:pointToPointShoppingRequest>
          <v2:pointToPointShoppingQuery>
            <v2:travelPointPairs>
              <v2:travelPointPair>
                <v2:originTravelPoint>${origin}</v2:originTravelPoint>
                <v2:destinationTravelPoint>${destination}</v2:destinationTravelPoint>
                <v2:departureDateTimeWindow>${departureDate}T${departureTime}:00</v2:departureDateTimeWindow>
              </v2:travelPointPair>
            </v2:travelPointPairs>
            <v2:passengerSpecs>
              <v2:passengerSpec>
                <v2:age>${age}</v2:age>
              </v2:passengerSpec>
            </v2:passengerSpecs>
          </v2:pointToPointShoppingQuery>
        </v2:pointToPointShoppingRequest>
      </soapenv:Body>
    </soapenv:Envelope>
    `;

    try {
      const response = await fetch(
        "http://localhost:5000/silverrail-shop-tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/xml",
          },
          body: xmlPayload,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("text/xml")) {
        throw new Error("Invalid content type, expected text/xml");
      }

      const text = await response.text();
      console.log("Received XML:", text); // Log the XML response text

      // Parse the received XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      console.log("xmlDoc:", xmlDoc); // Log the XML response text

      const nsResolver = (prefix) => {
        const ns = {
          ns0: "http://railgds.net/ws/commontypes",
          ns2: "http://railgds.net/ws/shopping",
        };
        return ns[prefix] || null;
      };

      const priceNodes = xmlDoc.evaluate(
        "//ns2:pointToPointPrice/ns0:totalPrice",
        xmlDoc,
        nsResolver,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );

      const extractedPrices = [];
      for (let i = 0; i < priceNodes.snapshotLength; i++) {
        const node = priceNodes.snapshotItem(i);
        const price = node.textContent;
        const currency = node.getAttribute("currency");
        extractedPrices.push({ price, currency });
      }

      setPrices(extractedPrices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            type="text"
            placeholder="Origin Station"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination Station"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>
            Price: {price.price} {price.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trains;
