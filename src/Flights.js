// Start of response-related UI elements
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
    setPassengerId('');

    const payload = {
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
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching offers');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);

      // Extract passengerId from the response
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
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      
      {/* Response-related UI elements start */}
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} className="offer-item">
            <p className="operator-name">{offer.slices[0].segments[0].operating_carrier.name}</p>
            <div className="flight-details">
              <div className="departure-info">
                <p className="departing-at">
                  {new Date(offer.slices[0].segments[0].departing_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="origin-name">{offer.slices[0].origin.name}</p>
              </div>
              <p className="duration">{offer.slices[0].segments[0].duration}</p>
              <div className="arrival-info">
                <p className="arriving-at">
                  {new Date(offer.slices[0].segments[0].arriving_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="destination-name">{offer.slices[0].destination.name}</p>
              </div>
            </div>
            <div className="offer-footer">
              <p className="total-amount">{offer.total_amount} {offer.total_currency}</p>
              <button className="select-button">Select</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Response-related UI elements end */}
    </div>
  );
};

export default Flights;
// End of response-related UI elements
