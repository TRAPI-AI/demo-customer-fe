// Start of response-related UI elements
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
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
        max_connections: 1,
        cabin_class: 'economy',
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
      setOffers(data.data.offers); // Updated to access offers within data.data
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
            <option value="infant_without_seat">Infant Without Seat</option>
          </select>
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      
      {/* Existing Offers List */}
      <ul>
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <p className="operator-name">{offer.operator_name}</p>
            <div>
              <p className="departing-at">Departing at: {offer.departure_time}</p>
              <p className="origin-name">Origin: {offer.origin}</p>
            </div>
            <p className="duration">Duration: {offer.duration}</p>
            <div>
              <p className="arriving-at">Arriving at: {offer.arrival_time}</p>
              <p className="destination-name">Destination: {offer.destination}</p>
            </div>
            <div>
              <p className="total-amount">Amount: {offer.amount} {offer.currency}</p>
              <button className="select-button">Select</button>
            </div>
          </li>
        ))}
      </ul>

      {/* New Response-Related UI Elements */}
      <ul>
        {offers.map((offer, index) => {
          // Extract passengerId from the first segment of the first slice
          const passengerId = offer.slices[0]?.segments[0]?.passengers[0]?.passenger_id;

          return (
            <li key={index} className="offer-item">
              <p className="operator-name">
                {offer.slices[0]?.segments[0]?.operating_carrier?.name}
              </p>
              <div>
                <p className="departing-at">
                  Departing at: {offer.slices[0]?.segments[0]?.departing_at}
                </p>
                <p className="duration">
                  Duration: {offer.slices[0]?.segments[0]?.duration}
                </p>
                <p className="arriving-at">
                  Arriving at: {offer.slices[0]?.segments[0]?.arriving_at}
                </p>
              </div>
              <div>
                <p className="origin-name">
                  Origin: {offer.slices[0]?.origin?.name}
                </p>
                <p className="destination-name">
                  Destination: {offer.slices[0]?.destination?.name}
                </p>
              </div>
              <div>
                <p className="total-amount">Total Amount: {offer.total_amount}</p>
                <button className="select-button">Select</button>
              </div>
              {/* You can utilize passengerId as needed */}
              {/* Example: <p className="passenger-id">Passenger ID: {passengerId}</p> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;
// End of response-related UI elements
