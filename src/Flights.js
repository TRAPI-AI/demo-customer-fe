// Integration code starts here
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState([{ type: 'adult' }]);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const handlePassengerChange = (index, value) => {
    const newPassengers = [...passengers];
    newPassengers[index].type = value;
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { type: 'adult' }]);
  };

  const removePassenger = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
  };

  const handleSearch = async () => {
    setLoading(true);
    const requestData = {
      slices: [
        {
          origin: origin,
          destination: destination,
          departure_date: departureDate,
        },
      ],
      passengers: passengers.map((p) => ({ type: p.type })),
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: requestData }),
      });

      if (response.ok) {
        const data = await response.json();
        setOffers(data.offers || []);
      } else {
        console.error('Error fetching offers:', response.statusText);
      }
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
          <div>
            {passengers.map((passenger, index) => (
              <div key={index} className="passenger">
                <select
                  value={passenger.type}
                  onChange={(e) => handlePassengerChange(index, e.target.value)}
                >
                  <option value="adult">Adult</option>
                  <option value="child">Child</option>
                  <option value="infant_without_seat">Infant without seat</option>
                </select>
                {passengers.length > 1 && (
                  <button onClick={() => removePassenger(index)}>Remove</button>
                )}
              </div>
            ))}
            <button onClick={addPassenger}>Add Passenger</button>
          </div>
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} className="offer-item">
            <p className="operator-name">{offer.operating_carrier.name}</p>
            <div>
              <p className="departing-at">{new Date(offer.slices[0].departure_time).toLocaleString()}</p>
              <p className="origin-name">{offer.slices[0].origin.airport.iata_code}</p>
            </div>
            <p className="duration">{offer.duration}</p>
            <div>
              <p className="arriving-at">{new Date(offer.slices[0].arrival_time).toLocaleString()}</p>
              <p className="destination-name">{offer.slices[0].destination.airport.iata_code}</p>
            </div>
            <div>
              <p className="total-amount">{offer.total_amount} {offer.total_currency}</p>
              <button className="select-button">Select</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
// Integration code ends here
