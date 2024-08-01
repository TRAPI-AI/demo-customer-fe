import React, { useState } from 'react';

const Flights = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({
    id: '',
    born_on: '',
    email: '',
    family_name: '',
    gender: '',
    given_name: '',
    phone_number: '',
    title: '',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  const handleSelectOffer = (offer) => {
    setSelectedOffer(offer);
    setPassengerDetails((prevDetails) => ({
      ...prevDetails,
      id: offer.passengers[0].id,
    }));
  };

  const handlePassengerDetailChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    const requestData = {
      data: {
        type: 'hold',
        passengers: [passengerDetails],
        selected_offers: [selectedOffer.id],
      },
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
      if (!data.errors) {
        setOrderSuccess(true);
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
      <ul>
        {offers.map((offer, index) => (
          <li key={index} className="offer-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>Total Amount: {offer.total_amount}</p>
            {offer.slices.map((slice, sliceIndex) => (
              <div key={sliceIndex}>
                <p>Origin: {slice.origin.name}</p>
                <p>Destination: {slice.destination.name}</p>
                {slice.segments.length > 0 && (
                  <div>
                    <p>Operating Carrier: {slice.segments[0].operating_carrier.name}</p>
                    <p>Departing At: {slice.segments[0].departing_at}</p>
                    <p>Duration: {slice.segments[0].duration}</p>
                    <p>Arriving At: {slice.segments[0].arriving_at}</p>
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => handleSelectOffer(offer)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedOffer && !orderSuccess && (
        <div className="passenger-details">
          <h3>Passenger Details</h3>
          <input
            type="text"
            name="born_on"
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={passengerDetails.born_on}
            onChange={handlePassengerDetailChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={passengerDetails.email}
            onChange={handlePassengerDetailChange}
          />
          <input
            type="text"
            name="family_name"
            placeholder="Family Name"
            value={passengerDetails.family_name}
            onChange={handlePassengerDetailChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={passengerDetails.gender}
            onChange={handlePassengerDetailChange}
          />
          <input
            type="text"
            name="given_name"
            placeholder="Given Name"
            value={passengerDetails.given_name}
            onChange={handlePassengerDetailChange}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={passengerDetails.phone_number}
            onChange={handlePassengerDetailChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={passengerDetails.title}
            onChange={handlePassengerDetailChange}
          />
          <button onClick={handleCreateOrder} disabled={loading}>
            {loading ? 'Loading...' : 'Create Order'}
          </button>
        </div>
      )}
      {orderSuccess && (
        <div className="order-success">
          <h3>Booking Successful!</h3>
          <p>Check your Duffel Orders Dashboard for booking.</p>
        </div>
      )}
    </div>
  );
};

export default Flights;
