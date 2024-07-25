import React, { useState } from "react";

function ListBookings() {
  const [bookings, setBookings] = useState([
    { journeyID: "123", name: "Journey 1" },
    { journeyID: "456", name: "Journey 2" },
    { journeyID: "789", name: "Journey 3" },
    { journeyID: "101", name: "Journey 4" },
  ]);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleCancelJourney = async (journeyID) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/jyrney-cancel-journey`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ journeyReference: journeyID }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        setBookings(bookings.filter(booking => booking.journeyID !== journeyID));
      } else {
        console.error('Failed to cancel journey');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input />
        <input />
        <button>Search</button>
      </div>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.journeyID} className="list-item">
            {booking.name}
            <button onClick={() => handleCancelJourney(booking.journeyID)}>
              Cancel Journey
            </button>
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      {responseData && (
        <div>
          <h3>Response Data</h3>
          <ul>
            <li>Field 1: {responseData.field1}</li>
            <li>Field 2: {responseData.field2}</li>
            <li>Field 3: {responseData.field3}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListBookings;
