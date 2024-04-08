// Here is the updated React component with the required form fields and state fields. 

import React, { useState } from "react";
import "./App.css";

function TripSearch() {
  const [destinations, setDestinations] = useState([{ countryCode: "", days: 0 }]);
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleDestinationChange = (index, field, value) => {
    const newDestinations = [...destinations];
    newDestinations[index][field] = value;
    setDestinations(newDestinations);
  };

  const handleSearch = () => {
    fetch('http://localhost:5000/simtex-esim-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destinations }),
    })
    .then(response => response.json())
    .then(data => {
      setQuotes(data.quoteOptions);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSelectQuote = (quote) => {
    setSelectedQuote(quote);
  };

  return (
    <div className="flex-column">
      <nav className="nav">
        <span className="logo">Your Logo</span>
      </nav>

      <div className="search-area">
        <div className="search">
          {destinations.map((destination, index) => (
            <div key={index}>
              <input
                className="input"
                placeholder="Country Code"
                value={destination.countryCode}
                onChange={(e) => handleDestinationChange(index, "countryCode", e.target.value)}
              />
              <input
                className="input"
                placeholder="Days"
                type="number"
                value={destination.days}
                onChange={(e) => handleDestinationChange(index, "days", e.target.value)}
              />
            </div>
          ))}
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <ul className="flex-column-center">
        <h2 className="logo">Results</h2>
        {quotes.map((quote, index) => (
          <li className="result" key={index}>
            <p>Price: {quote.price} {quote.currencyCode}</p>
            <p>Total QuotaGB: {quote.totalQuotaGB}</p>
            <p>Destinations:</p>
            {quote.destinations.map((destination, i) => (
              <p key={i}>Country: {destination.countryCode}, QuotaGB: {destination.quotaGB}</p>
            ))}
            <button onClick={() => handleSelectQuote(quote)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripSearch;

// The handleSearch function now includes a fetch call to the '/simtex-esim-search' route on the backend. The destinations state is sent in the body of the request. The response is expected to be a JSON object with a 'quoteOptions' property, which is an array of quotes. The quotes state is set with this array. The handleSelectQuote function is used to set the selectedQuote state with the selected quote. The form and list of quotes are rendered in the return statement. The form includes inputs for the country code and number of days for each destination. The list of quotes includes the price, total quota, and a list of destinations with their respective quotas for each quote. A select button is included for each quote.