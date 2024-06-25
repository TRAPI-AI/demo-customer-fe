
// Import necessary libraries
import React, { useState } from 'react';

// Define the Trains component
const Trains = () => {
  // Define state variables
  const [originTravelPoint, setOriginTravelPoint] = useState('');
  const [destinationTravelPoint, setDestinationTravelPoint] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [age, setAge] = useState('');
  const [includeReturnFares, setIncludeReturnFares] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Define the API call handler
  const handleSearch = async () => {
    setLoading(true);
    const requestBody = `
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
                  <originTravelPoint type="STATION">${originTravelPoint}</originTravelPoint>
                  <destinationTravelPoint type="STATION">${destinationTravelPoint}</destinationTravelPoint>
                  <departureDateTimeWindow>
                    <date>${departureDate}</date>
                    <time>${departureTime}:00</time>
                  </departureDateTimeWindow>
                </shop:travelPointPair>
              </shop:travelPointPairs>
              <shop:passengerSpecs>
                <shop:passengerSpec>
                  <age>${age}</age>
                </shop:passengerSpec>
              </shop:passengerSpecs>
              <shop:includeReturnFares>${includeReturnFares}</shop:includeReturnFares>
            </shop:pointToPointShoppingQuery>
          </shop:pointToPointShoppingRequest>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
      const response = await fetch('http://localhost:5000/silverrail-shop-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
        },
        body: requestBody,
      });

      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const nsResolver = (prefix) => {
        const ns = {
          ns0: "http://railgds.net/ws/commontypes",
          ns2: "http://railgds.net/ws/shopping",
        };
        return ns[prefix] || null;
      };

      // Adjust the XPath to correctly target the totalPrice element
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
        const price = node.textContent; // Ensure this is the correct node containing the price
        const currency = node.getAttribute("currency"); // Ensure the currency attribute exists

        if (price && currency) {
          extractedPrices.push({ price, currency });
        }
      }

      setResults(extractedPrices);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields */}
          <input
            type="text"
            placeholder="Origin Travel Point"
            value={originTravelPoint}
            onChange={(e) => setOriginTravelPoint(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination Travel Point"
            value={destinationTravelPoint}
            onChange={(e) => setDestinationTravelPoint(e.target.value)}
          />
          <input
            type="date"
            placeholder="Departure Date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Departure Time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label>
            Include Return Fares
            <input
              type="checkbox"
              checked={includeReturnFares}
              onChange={(e) => setIncludeReturnFares(e.target.checked)}
            />
          </label>
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items */}
      <ul>
        {results.map((result, index) => (
          <li key={index} className="offer-item">
            {result.currency} {result.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trains;
//