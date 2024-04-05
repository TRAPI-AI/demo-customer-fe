import React, { useState } from 'react';

function TripSearch() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [response, setResponse] = useState(null);

  const handleSearch = () => {
    const requestData = {
      destinations: [
        {
          countryCode: destination,
          days: parseInt(days)
        }
      ]
    };

    fetch('http://localhost:5000/simtex-esim-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => setResponse(data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-200 border-b border-gray-300 flex shadow-xs">
        <span className="font-semibold text-xl p-4">Your Logo</span>
      </nav>

      <div className="flex justify-center mt-14 items-start h-1/3">
        <div className="bg-slate-800 p-14 border border-gray-300 w-11/12 rounded-lg">
          <div className="flex items-center  justify-center gap-3">
            <input 
              className="input rounded-lg border-gray-600 border p-4" 
              placeholder="Destination Country Code" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)} 
            />
            <input 
              className="input rounded-lg border-gray-600 border p-4" 
              placeholder="Number of Days" 
              type="number" 
              value={days} 
              onChange={(e) => setDays(e.target.value)} 
            />
            <button className="bg-blue-500 text-white font-semibold rounded-full px-6 py-4" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl p-14 text-left font-bold">Results</h2>

      <ul className="flex gap-8 mx-14 justify-around items-center">
        {response && response.quoteOptions.map((quote) => (
          <li key={quote.id} className="w-1/3 h-40 border border-gray-400 rounded-lg">
            <p>Price: {quote.price} {quote.currencyCode}</p>
            <p>Total Quota: {quote.totalQuotaGB} GB</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripSearch;


// The code has been updated to include the API request using the Fetch API to send a POST request to the specified backend route '/simtex-esim-search' with the required request data. The response from the API is then set to the state for displaying the results.