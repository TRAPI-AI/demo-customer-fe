// Start of generated React component for Flights API integration
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const requestBody = {
      data: {
        slices: [
          {
            origin: origin,
            destination: destination,
            departure_date: departureDate,
          },
        ],
        passengers: [
          {
            type: passengerType,
          },
        ],
        max_connections: maxConnections,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
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
          <div>
            <label>Origin:</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origin"
            />
          </div>
          <div>
            <label>Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
            />
          </div>
          <div>
            <label>Departure Date:</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div>
            <label>Passenger Type:</label>
            <select
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value)}
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant_without_seat">Infant without Seat</option>
            </select>
          </div>
          <div>
            <label>Max Connections:</label>
            <input
              type="number"
              min="0"
              value={maxConnections}
              onChange={(e) => setMaxConnections(Number(e.target.value))}
            />
          </div>
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        {offers.map((offer, offerIndex) => (
          <li
            className="offer-item"
            key={offer.id || offerIndex}
            style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}
          >
            <p><strong>Total Amount:</strong> {offer.total_amount}</p>
            {offer.slices && offer.slices.length > 0 && (
              <div>
                {offer.slices.map((slice, sliceIndex) => (
                  <div key={slice.id || sliceIndex} style={{ marginBottom: '12px' }}>
                    <p><strong>Origin:</strong> {slice.origin.name}</p>
                    <p><strong>Destination:</strong> {slice.destination.name}</p>
                    {slice.segments && slice.segments.length > 0 && (
                      <div>
                        {slice.segments.slice(0, 1).map((segment, segmentIndex) => {
                          const passengerId = segment.passengers && segment.passengers[0]?.passenger_id;
                          return (
                            <div key={segment.id || segmentIndex}>
                              <p><strong>Operating Carrier:</strong> {segment.operating_carrier.name}</p>
                              <p><strong>Departing At:</strong> {segment.departing_at}</p>
                              <p><strong>Duration:</strong> {segment.duration}</p>
                              <p><strong>Arriving At:</strong> {segment.arriving_at}</p>
                              <button
                                onClick={() => {
                                  // Handle selection logic here
                                  console.log('Selected Passenger ID:', passengerId);
                                }}
                              >
                                Select
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
// End of generated React component for Flights API integration
