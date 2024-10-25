// React component for flight search and offers listing with response-related UI elements
import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passengerId, setPassengerId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
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
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flight offers');
      }

      const data = await response.json();
      setOffers(data.data.offers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (offer, sliceIndex, segmentIndex, passengerIdValue) => {
    setPassengerId(passengerIdValue);
    // Additional logic for handling selection can be added here
    console.log('Selected Offer ID:', offer.id);
    console.log('Passenger ID:', passengerIdValue);
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <form onSubmit={handleSubmit}>
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
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant_without_seat">Infant without Seat</option>
            </select>
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      <ul>
        {offers.map((offer) =>
          offer.slices.map((slice, sliceIndex) =>
            slice.segments.map((segment, segmentIndex) => {
              const operatingCarrierName = segment.operating_carrier.name;
              const departingAt = segment.departing_at;
              const duration = segment.duration;
              const arrivingAt = segment.arriving_at;
              const originName = slice.origin.name;
              const destinationName = slice.destination.name;
              const totalAmount = offer.total_amount;
              const passengerIdValue =
                segment.passengers && segment.passengers.length > 0
                  ? segment.passengers[0].passenger_id
                  : '';

              return (
                <li key={`${offer.id}-${sliceIndex}-${segment.id}`} className="offer-item">
                  <p className="operating-carrier-name">{operatingCarrierName}</p>
                  <div>
                    <p className="departing-at">Departing at: {departingAt}</p>
                    <p className="duration">Duration: {duration}</p>
                    <p className="arriving-at">Arriving at: {arrivingAt}</p>
                  </div>
                  <div>
                    <p className="origin-name">Origin: {originName}</p>
                    <p className="destination-name">Destination: {destinationName}</p>
                  </div>
                  <div>
                    <p className="total-amount">Amount: {totalAmount}</p>
                    <button
                      className="select-button"
                      onClick={() => handleSelect(offer, sliceIndex, segmentIndex, passengerIdValue)}
                    >
                      Select
                    </button>
                  </div>
                </li>
              );
            })
          )
        )}
      </ul>
    </div>
  );
};

export default Flights;
// End of React component for flight search and offers listing with response-related UI elements
