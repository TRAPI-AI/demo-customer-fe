// Start

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passengerId, setPassengerId] = useState(null); // Added state for passengerId

  const handleSearch = async () => {
    setLoading(true);
    const requestBody = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_time: {
              from: "00:00",
              to: "23:59"
            },
            departure_date: departureDate,
            arrival_time: {
              from: "00:00",
              to: "23:59"
            }
          }
        ],
        private_fares: {
          QF: [
            {
              corporate_code: "",
              tracking_reference: ""
            }
          ],
          UA: [
            {
              corporate_code: "",
              tour_code: ""
            }
          ]
        },
        passengers: [
          {
            family_name: "",
            given_name: "",
            loyalty_programme_accounts: [
              {
                account_number: "",
                airline_iata_code: ""
              }
            ],
            type: passengerType
          },
          {
            age: 18,
            fare_type: ""
          }
        ],
        max_connections: maxConnections,
        cabin_class: "economy"
      }
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers || []); // Updated to match the response structure
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          {/* Input fields go in this container */}
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <select
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant without seat</option>
          </select>
          <input
            type="number"
            min="0"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
          />
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, offerIndex) => (
            <li className="offer-item" key={offer.id || offerIndex} style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p><strong>Total Amount:</strong> {offer.total_amount} {offer.total_currency}</p>
              {offer.slices && offer.slices.length > 0 && offer.slices.map((slice, sliceIndex) => (
                <div key={slice.id || sliceIndex} style={{ marginTop: '8px' }}>
                  <p><strong>Origin:</strong> {slice.origin.name}</p>
                  <p><strong>Destination:</strong> {slice.destination.name}</p>
                  {slice.segments && slice.segments.length > 0 && (
                    <div style={{ marginLeft: '16px' }}>
                      <p><strong>Operating Carrier:</strong> {slice.segments[0].operating_carrier.name}</p>
                      <p><strong>Departing At:</strong> {new Date(slice.segments[0].departing_at).toLocaleString()}</p>
                      <p><strong>Duration:</strong> {slice.segments[0].duration}</p>
                      <p><strong>Arriving At:</strong> {new Date(slice.segments[0].arriving_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => {
                if (offer.slices && offer.slices.length > 0 && offer.slices[0].segments && offer.slices[0].segments.length > 0 && offer.slices[0].segments[0].passengers && offer.slices[0].segments[0].passengers.length > 0) {
                  setPassengerId(offer.slices[0].segments[0].passengers[0].passenger_id);
                }
              }}>
                Select
              </button>
            </li>
          ))
        ) : (
          !loading && <li>No offers available.</li>
        )}
      </ul>
    </div>
  );
};

export default Flights;

// End
