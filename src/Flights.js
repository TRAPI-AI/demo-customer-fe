import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    const requestData = {
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
      },
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error:', error);
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
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {offers.map((offer, index) => {
          const firstSegment = offer.slices[0].segments[0];
          const passengerId = firstSegment.passengers[0].passenger_id;
          return (
            <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p>Total Amount: {offer.total_amount}</p>
              <p>Operating Carrier: {firstSegment.operating_carrier.name}</p>
              <p>Departing At: {firstSegment.departing_at}</p>
              <p>Duration: {firstSegment.duration}</p>
              <p>Arriving At: {firstSegment.arriving_at}</p>
              <p>Origin: {offer.slices[0].origin.name}</p>
              <p>Destination: {offer.slices[0].destination.name}</p>
              <button>Select</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;
