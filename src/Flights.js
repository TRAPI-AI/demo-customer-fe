// Start Response UI elements
// React component for Flights with API integration
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      data: {
        slices: [
          {
            origin,
            destination,
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
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOffers(data.data.offers || []);

      // Extract passengerId from the first offer, first slice, first segment, first passenger
      if (
        data.data.offers &&
        data.data.offers.length > 0 &&
        data.data.offers[0].slices &&
        data.data.offers[0].slices.length > 0 &&
        data.data.offers[0].slices[0].segments &&
        data.data.offers[0].slices[0].segments.length > 0 &&
        data.data.offers[0].slices[0].segments[0].passengers &&
        data.data.offers[0].slices[0].segments[0].passengers.length > 0
      ) {
        setPassengerId(data.data.offers[0].slices[0].segments[0].passengers[0].passenger_id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              id="origin"
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              id="destination"
            />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
              id="departure-date"
            />
            <select
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value)}
              id="passenger-type"
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant_without_seat">Infant Without Seat</option>
            </select>
            <input
              type="number"
              min="0"
              value={maxConnections}
              onChange={(e) => setMaxConnections(parseInt(e.target.value, 10))}
              placeholder="Max Connections"
              id="max-connections"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {offers.map((offer) => {
          const firstSlice = offer.slices && offer.slices[0];
          const firstSegment =
            firstSlice && firstSlice.segments && firstSlice.segments[0];
          const passenger =
            firstSegment &&
            firstSegment.passengers &&
            firstSegment.passengers[0];

          // Store passenger_id in passengerId
          const currentPassengerId = passenger ? passenger.passenger_id : '';

          return (
            <li key={offer.id} className="offer-item" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
              <p className="total-amount">Total Amount: {offer.total_amount}</p>
              {firstSegment && (
                <div className="segment-details">
                  <p className="operating-carrier-name">Carrier: {firstSegment.operating_carrier.name}</p>
                  <p className="departing-at">Departing at: {firstSegment.departing_at}</p>
                  <p className="duration">Duration: {firstSegment.duration}</p>
                  <p className="arriving-at">Arriving at: {firstSegment.arriving_at}</p>
                </div>
              )}
              {firstSlice && (
                <div className="slice-details">
                  <p className="origin-name">Origin: {firstSlice.origin.name}</p>
                  <p className="destination-name">Destination: {firstSlice.destination.name}</p>
                </div>
              )}
              <button className="select-button" onClick={() => console.log(`Selected Offer ID: ${offer.id}, Passenger ID: ${currentPassengerId}`)}>
                Select
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;
// End Response UI elements
