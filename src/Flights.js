import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = {
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
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setOffers(result.data.offers);
    } catch (error) {
      console.error('Error fetching offers:', error);
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
            <option value="infant_without_seat">Infant without seat</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {offers.map((offer, index) => (
            <li key={index} className="offer-item">
              <p className="operator-name">
                {offer.slices[0].segments[0].operating_carrier.name}
              </p>
              <div>
                <p className="departing-at">
                  {offer.slices[0].segments[0].departing_at}
                </p>
                <p className="origin-name">{offer.slices[0].origin.name}</p>
              </div>
              <p className="duration">{offer.slices[0].segments[0].duration}</p>
              <div>
                <p className="arriving-at">
                  {offer.slices[0].segments[0].arriving_at}
                </p>
                <p className="destination-name">
                  {offer.slices[0].destination.name}
                </p>
              </div>
              <div>
                <p className="total-amount">{offer.total_amount}</p>
                <button className="select-button">Select</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Flights;
