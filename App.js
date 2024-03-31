import React, { useState } from "react";

function App() {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [results, setResults] = useState([]);

  const searchStays = async (data) => {
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const submitSearch = async () => {
    const data = {
      destination: destination,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    try {
      const results = await searchStays(data);
      setResults(results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div id="searchForm">
        <input
          type="text"
          id="destination"
          placeholder="Enter destination"
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          id="checkInDate"
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <input
          type="date"
          id="checkOutDate"
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <button onClick={submitSearch}>Search</button>
      </div>
      <div id="results">
        {results.map((result, index) => (
          <div key={index}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
            <p>{result.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
