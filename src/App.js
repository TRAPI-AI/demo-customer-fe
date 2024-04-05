// Start of the response

import React, { useState } from 'react';

function TripSearch() {
  // State fields for the input values
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('');
  const [responseData, setResponseData] = useState(null);

  // Function to handle form submission and make the API call
  const handleSearch = async () => {
    const requestData = {
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
      const response = await fetch('http://localhost:5000/duffel-flights-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-200 border-b border-gray-300 flex shadow-xs">
        <span className="font-semibold text-xl p-4">Your Logo</span>
      </nav>

      <div className="flex justify-center mt-14 items-start h-1/3">
        <div className="bg-slate-800 p-14 border border-gray-300 w-11/12 rounded-lg">
          <div className="flex items-center justify-center gap-3">
            {/* Updated input fields with state bindings */}
            <input
              className="input rounded-lg border-gray-600 border p-4"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <input
              className="input rounded-lg border-gray-600 border p-4"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              className="input rounded-lg border-gray-600 border p-4"
              placeholder="Departure Date (yyyy-mm-dd)"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <input
              className="input rounded-lg border-gray-600 border p-4"
              placeholder="Passenger Type"
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white font-semibold rounded-full px-6 py-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl p-14 text-left font-bold">Results</h2>

      <div className="mx-14">
        {responseData && responseData.data && responseData.data.offers.map((offer, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg">
            <p className="font-bold">Total Amount: {offer.total_amount}</p>
            {offer.slices.map((slice, sliceIndex) => (
              <div key={sliceIndex} className="mt-4">
                <p>Departure Date: {slice.departure_date}</p>
                {slice.segments && slice.segments.slice(0, 1).map((segment, segmentIndex) => (
                  <div key={segmentIndex}>
                    <p>Carrier: {segment.operating_carrier.name}</p>
                    <p>Departing At: {segment.departing_at}</p>
                    <p>Arriving At: {segment.arriving_at}</p>
                  </div>
                ))}
                <p>Origin: {slice.origin.name}</p>
                <p>Destination: {slice.destination.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripSearch;

// End of the response
//