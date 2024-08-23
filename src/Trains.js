import React, { useState } from 'react';

const Trains = () => {
  const [originTravelPoint, setOriginTravelPoint] = useState('');
  const [destinationTravelPoint, setDestinationTravelPoint] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [age, setAge] = useState('');
  const [nameFirst, setNameFirst] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [addressType, setAddressType] = useState('');
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState('');
  const [contactMedium, setContactMedium] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [recordLocator, setRecordLocator] = useState('');

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

  const handleCreateBooking = async () => {
    setLoading(true);
    const requestBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:book="http://railgds.net/ws/booking" xmlns="http://railgds.net/ws/commontypes">
        <soapenv:Header/>
        <soapenv:Body>
          <book:createBookingRecordRequest>
            <context>
              <distributorCode>TRAPI</distributorCode>
              <pointOfSaleCode>GB</pointOfSaleCode>
              <channelCode>WEB</channelCode>
            </context>
            <book:passengers>
              <book:passenger passengerID="PAX_SPEC_0">
                <nameFirst>${nameFirst}</nameFirst>
                <nameLast>${nameLast}</nameLast>
                <contactInformation>
                  <contact>
                    <contactType>${contactType}</contactType>
                    <contactMedium>${contactMedium}</contactMedium>
                    <contactInfo>${contactInfo}</contactInfo>
                  </contact>
                </contactInformation>
                <ageAtTimeOfTravel>${age}</ageAtTimeOfTravel>
              </book:passenger>
            </book:passengers>
            <book:legSolutions>
              <legSolution legSolutionID="LS_1_1">
                <numberOfConnections>0</numberOfConnections>
                <travelSegments>
                  <travelSegment sequence="0" travelSegmentID="LS_1_1_TS_0" type="TRAIN">
                    <originTravelPoint type="STATION">${originTravelPoint}</originTravelPoint>
                    <destinationTravelPoint type="STATION">${destinationTravelPoint}</destinationTravelPoint>
                    <departureDateTime>${departureDate}T${departureTime}:00</departureDateTime>
                    <arrivalDateTime>YYYY-MM-DDTHH:MM:00</arrivalDateTime>
                    <designator>2257</designator>
                    <marketingCarrier>Amtrak</marketingCarrier>
                    <equipmentType code="HSP">High-Speed</equipmentType>
                  </travelSegment>
                </travelSegments>
                <passengerInformationRequired>
                  <passengerInformation type="PASSENGER_NAME" allPassengers="true"/>
                </passengerInformationRequired>
              </legSolution>
            </book:legSolutions>
            <book:prices>
              <book:pointToPointPrice priceID="PRICE_LS_1_1_0">
                <totalPrice currency="USD">129.00</totalPrice>
                <restrictiveFareClass>VALUE</restrictiveFareClass>
                <ticketableFares>
                  <ticketableFare>
                    <totalPrice currency="USD">129.00</totalPrice>
                    <passengerReferences>
                      <passengerReference>
                        <passengerIDRef>PAX_SPEC_0</passengerIDRef>
                        <passengerTypeCode>F</passengerTypeCode>
                        <fareCodes>
                          <fareCode code="K-KD">
                            <serviceClass>THIRD</serviceClass>
                            <travelSegmentIDRef>LS_1_1_TS_0</travelSegmentIDRef>
                            <cabinClass>Business Class Seat</cabinClass>
                            <fareDisplayName>Value</fareDisplayName>
                          </fareCode>
                        </fareCodes>
                      </passengerReference>
                    </passengerReferences>
                    <prices>
                      <price type="TICKETED_RES" currency="USD">129.00</price>
                    </prices>
                  </ticketableFare>
                </ticketableFares>
                <legReferences>
                  <legSolutionIDRef>LS_1_1</legSolutionIDRef>
                </legReferences>
              </book:pointToPointPrice>
            </book:prices>
          </book:createBookingRecordRequest>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
      const response = await fetch('http://localhost:5000/silverrail-create-booking', {
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
          ns2: "http://railgds.net/ws/booking",
        };
        return ns[prefix] || null;
      };

      const recordLocatorNode = xmlDoc.evaluate(
        "//ns2:createBookingRecordResponse/ns2:recordLocator",
        xmlDoc,
        nsResolver,
        XPathResult.STRING_TYPE,
        null
      );

      const recordLocator = recordLocatorNode.stringValue;
      setRecordLocator(recordLocator);
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <input
            type="text"
            placeholder="Origin Station Code"
            value={originTravelPoint}
            onChange={(e) => setOriginTravelPoint(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination Station Code"
            value={destinationTravelPoint}
            onChange={(e) => setDestinationTravelPoint(e.target.value)}
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
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <div className="booking-form">
        <input
          type="text"
          placeholder="First Name"
          value={nameFirst}
          onChange={(e) => setNameFirst(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={nameLast}
          onChange={(e) => setNameLast(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address Type"
          value={addressType}
          onChange={(e) => setAddressType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Type"
          value={contactType}
          onChange={(e) => setContactType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Medium"
          value={contactMedium}
          onChange={(e) => setContactMedium(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <button onClick={handleCreateBooking} disabled={loading}>
          {loading ? 'Loading...' : 'Create Booking'}
        </button>
      </div>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="offer-item">
            {result.currency} {result.price}
          </li>
        ))}
      </ul>
      {recordLocator && (
        <div className="booking-response">
          <h3>Booking Successful!</h3>
          <p>Record Locator: {recordLocator}</p>
        </div>
      )}
    </div>
  );
};

export default Trains;
