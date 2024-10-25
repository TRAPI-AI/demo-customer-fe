// Start Response UI Elements

// React Component for Duffel API Integration

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
    setOffers([]);
    setPassengerId('');

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
        max_connections: parseInt(maxConnections, 10),
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
        throw new Error(errorData.error || 'Failed to fetch offers');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);

      if (data.data.offers.length > 0) {
        const firstOffer = data.data.offers[0];
        if (firstOffer.slices && firstOffer.slices.length > 0) {
          const firstSlice = firstOffer.slices[0];
          if (firstSlice.segments && firstSlice.segments.length > 0) {
            const firstSegment = firstSlice.segments[0];
            if (firstSegment.passengers && firstSegment.passengers.length > 0) {
              setPassengerId(firstSegment.passengers[0].passenger_id);
            }
          }
        }
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
            />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
            <select
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value)}
              required
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant_without_seat">Infant without seat</option>
            </select>
            <input
              type="number"
              min="0"
              value={maxConnections}
              onChange={(e) => setMaxConnections(e.target.value)}
              placeholder="Max Connections"
              required
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} className="offer-item">
            <p className="operator-name">{offer.operating_carrier.name}</p>
            {offer.slices && offer.slices.length > 0 && (
              <div className="slice-details">
                <p className="departing-at">
                  {new Date(offer.slices[0].segments[0].departing_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="duration">{offer.slices[0].segments[0].duration}</p>
                <p className="arriving-at">
                  {new Date(offer.slices[0].segments[0].arriving_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="origin-name">{offer.slices[0].origin.name}</p>
                <p className="destination-name">{offer.slices[0].destination.name}</p>
              </div>
            )}
            <p className="total-amount">{offer.total_amount} {offer.se_currency}</p>
            <button className="select-button">Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;

// End Response UI Elements
