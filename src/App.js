import React, { useState } from 'react';

function TripSearch() {
  const [countryCode, setCountryCode] = useState('');
  const [days, setDays] = useState('');
  const [quoteID, setQuoteID] = useState('');
  const [quotes, setQuotes] = useState([]);

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleQuoteSelect = (id) => {
    setQuoteID(id);
  };

  const handleSearch = async () => {
    const response = await fetch('http://localhost:5000/simtex-esim-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinations: [
          {
            countryCode: countryCode,
            days: parseInt(days),
          },
        ],
      }),
    });

    const data = await response.json();
    setQuotes(data.quoteOptions);
  };

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
              value={countryCode} 
              onChange={handleCountryCodeChange} 
              placeholder="Country Code" 
            />
            <input 
              className="input rounded-lg border-gray-600 border p-4" 
              value={days} 
              onChange={handleDaysChange} 
              placeholder="Days" 
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

      <ul className="flex gap-8 mx-14 justify-around items-center">
        {quotes.map((quote) => (
          <li key={quote.id} className="w-1/3 h-40 border border-gray-400 rounded-lg">
            <div className="p-4">
              <p>Price: {quote.price} {quote.currencyCode}</p>
              <p>Total Quota: {quote.totalQuotaGB} GB</p>
            </div>
            <button onClick={() => handleQuoteSelect(quote.id)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripSearch;