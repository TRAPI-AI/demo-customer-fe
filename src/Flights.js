import React, { useState } from 'react';

const Flights = () => {
  const [loading, setLoading] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [passengerDetails, setPassengerDetails] = useState({
    id: '', // This should be dynamically set from data[0].passengers[0].id
    born_on: '',
    email: '',
    family_name: '',
    gender: '',
    given_name: '',
    phone_number: '',
    title: ''
  });
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails({
      ...passengerDetails,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      data: {
        type: 'hold',
        passengers: [passengerDetails],
        selected_offers: [selectedOfferId]
      }
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(result);
      setResponseData(result.data);
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
          <input type="text" placeholder="Selected Offer ID" value={selectedOfferId} onChange={(e) => setSelectedOfferId(e.target.value)} />
          <input type="text" name="born_on" placeholder="Date of Birth (YYYY-MM-DD)" value={passengerDetails.born_on} onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={passengerDetails.email} onChange={handleInputChange} />
          <input type="text" name="family_name" placeholder="Family Name" value={passengerDetails.family_name} onChange={handleInputChange} />
          <input type="text" name="gender" placeholder="Gender" value={passengerDetails.gender} onChange={handleInputChange} />
          <input type="text" name="given_name" placeholder="Given Name" value={passengerDetails.given_name} onChange={handleInputChange} />
          <input type="text" name="phone_number" placeholder="Phone Number" value={passengerDetails.phone_number} onChange={handleInputChange} />
          <input type="text" name="title" placeholder="Title" value={passengerDetails.title} onChange={handleInputChange} />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </div>
      {/* Response items go in this container */}
      {responseData && (
        <div className="response-data">
          <h3>Response Data</h3>
          <p><strong>City Name:</strong> {responseData.slices[0].segments[0].origin.city.name}</p>
          <p><strong>Total Amount:</strong> {responseData.total_amount}</p>
        </div>
      )}
    </div>
  );
};

export default Flights;
