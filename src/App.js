import React, { useState } from "react";
import FlightSearch from "./FlightSearch";
import FlightResults from "./FlightResults";

const App = () => {
  const [offers, setOffers] = useState([]);

  const handleSearchResults = (data) => {
    setOffers(data.offers);
  };

  return (
    <div>
      <FlightSearch onSearchResults={handleSearchResults} />
      <FlightResults offers={offers} />
    </div>
  );
};

export default App;
