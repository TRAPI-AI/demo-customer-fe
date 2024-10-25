// Start of Response-related UI Elements

import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);
  const [passengerId, setPassengerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setOffers([]);

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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (offer) => {
    if (
      offer.slices &&
      offer.slices.length > 0 &&
      offer.slices[0].segments &&
      offer.slices[0].segments.length > 0 &&
      offer.slices[0].segments[0].passengers &&
      offer.slices[0].segments[0].passengers.length > 0
    ) {
      setPassengerId(offer.slices[0].segments[0].passengers[0].passenger_id);
      console.log('Selected Passenger ID:', offer.slices[0].segments[0].passengers[0].passenger_id);
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
            placeholder="Departure Date"
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
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} className="offer-item">
            <p className="operating-carrier-name">{offer.operating_carrier.name}</p>
            {offer.slices && offer.slices.length > 0 && (
              <div className="slice-details">
                <p className="departing-at">
                  Departing At: {offer.slices[0].segments[0].departing_at}
                </p>
                <p className="duration">
                  Duration: {offer.slices[0].segments[0].duration}
                </p>
                <p className="arriving-at">
                  Arriving At: {offer.slices[0].segments[0].arriving_at}
                </p>
                <p className="origin-name">
                  Origin: {offer.slices[0].origin.name}
                </p>
                <p className="destination-name">
                  Destination: {offer.slices[0].destination.name}
                </p>
              </div>
            )}
            <p className="total-amount">Total Amount: {offer.total_amount}</p>
            <button
              className="select-button"
              onClick={() => handleSelect(offer)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;

// End of Response-related UI Elements
