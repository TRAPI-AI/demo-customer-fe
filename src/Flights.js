// Begin Response-Related UI Elements Integration

// React component for flight search and offers display
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
            <option value="infant_without_seat">Infant without Seat</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      <ul>
        {offers.map((offer) => {
          // Extracting passengerId
          const passengerId =
            offer.slices[0]?.segments[0]?.passengers[0]?.passenger_id || '';

          // Extracting operating carrier name
          const operatingCarrierName =
            offer.slices[0]?.segments[0]?.operating_carrier?.name || 'N/A';

          // Extracting departure and arrival details
          const firstSegment = offer.slices[0]?.segments[0];
          const departingAt = firstSegment
            ? new Date(firstSegment.departing_at).toLocaleTimeString()
            : 'N/A';
          const arrivingAt = firstSegment
            ? new Date(firstSegment.arriving_at).toLocaleTimeString()
            : 'N/A';
          const duration = firstSegment?.duration || 'N/A';

          // Extracting origin and destination names
          const originName = offer.slices[0]?.origin?.name || 'N/A';
          const destinationName = offer.slices[0]?.destination?.name || 'N/A';

          // Extracting total amount
          const totalAmount = offer.total_amount
            ? `${offer.total_amount} ${offer.total_currency}`
            : 'N/A';

          return (
            <li key={offer.id} className="offer-item">
              <p className="operator-name">{operatingCarrierName}</p>
              <div>
                <p className="departing-at">Depart: {departingAt}</p>
                <p className="origin-name">From: {originName}</p>
              </div>
              <p className="duration">Duration: {duration}</p>
              <div>
                <p className="arriving-at">Arrive: {arrivingAt}</p>
                <p className="destination-name">To: {destinationName}</p>
              </div>
              <div>
                <p className="total-amount">{totalAmount}</p>
                <button
                  className="select-button"
                  onClick={() => {
                    // Handle select action, possibly using passengerId
                    console.log(`Selected offer for Passenger ID: ${passengerId}`);
                  }}
                >
                  Select
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Flights;

// End Response-Related UI Elements Integration
