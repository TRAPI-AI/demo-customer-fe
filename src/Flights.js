import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [passengerDetails, setPassengerDetails] = useState({
    born_on: '',
    email: '',
    family_name: '',
    gender: '',
    given_name: '',
    phone_number: '',
    title: '',
  });

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
        max_connections: maxConnections,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data);
      setOffers(data.data.offers);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    setLoading(true);
    const passengerId = offers[0].slices[0].segments[0].passengers[0].passenger_id;
    const requestData = {
      type: 'hold',
      passengers: [
        {
          id: passengerId,
          ...passengerDetails,
        },
      ],
      selected_offers: [selectedOfferId],
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data);
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
          <input
            type="number"
            placeholder="Max Connections"
            value={maxConnections}
            onChange={(e) => setMaxConnections(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>
      <div className="offers-list">
        {offers.map((offer, index) => {
          const firstSegment = offer.slices[0].segments[0];
          return (
            <div key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p>Total Amount: {offer.total_amount}</p>
              <p>Operating Carrier: {firstSegment.operating_carrier.name}</p>
              <p>Departing At: {firstSegment.departing_at}</p>
              <p>Duration: {firstSegment.duration}</p>
              <p>Arriving At: {firstSegment.arriving_at}</p>
              <p>Origin: {offer.slices[0].origin.name}</p>
              <p>Destination: {offer.slices[0].destination.name}</p>
              <button onClick={() => setSelectedOfferId(offer.id)}>Select</button>
            </div>
          );
        })}
      </div>
      {selectedOfferId && (
        <div className="passenger-details">
          <h3>Passenger Details</h3>
          <input
            type="date"
            placeholder="Date of Birth"
            value={passengerDetails.born_on}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, born_on: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={passengerDetails.email}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Family Name"
            value={passengerDetails.family_name}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, family_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gender"
            value={passengerDetails.gender}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, gender: e.target.value })}
          />
          <input
            type="text"
            placeholder="Given Name"
            value={passengerDetails.given_name}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, given_name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={passengerDetails.phone_number}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, phone_number: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title"
            value={passengerDetails.title}
            onChange={(e) => setPassengerDetails({ ...passengerDetails, title: e.target.value })}
          />
          <button onClick={handleOrder} disabled={loading}>
            {loading ? 'Loading...' : 'Place Order'}
          </button>
        </div>
      )}
      {offers.length > 0 && (
        <div className="selected-offer-details">
          <h3>Selected Offer Details</h3>
          {offers.map((offer, index) => (
            <div key={index} className="offer-details" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p>City Name: {offer.slices[0].origin.city.name}</p>
              <p>Total Amount: {offer.total_amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;
