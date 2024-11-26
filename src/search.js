import React, { useState } from "react";
import Navbar from "./navbar";
import Tabs from "./Tabs";
import FlightSearch from "./FlightSearch";
import Stays from "./Stays";
import Cruises from "./Cruises";
import CarRentals from "./CarRentals";
import Esims from "./Esims";
import Inspiration from "./inspiration";
import Trains from "./Trains";
import RideHailing from "./RideHailing";

function Search() {
  const [activeTab, setActiveTab] = useState('FlightSearch');

  return (
    <div>
      <Navbar />
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'FlightSearch' && <FlightSearch />}
      {activeTab === 'Stays' && <Stays />}
      {activeTab === 'Cruises' && <Cruises />}
      {activeTab === 'Trains' && <Trains />}
      {activeTab === 'Car Rentals' && <CarRentals />}
      {activeTab === 'Ride Hailing' && <RideHailing />}
      {activeTab === 'eSims' && <Esims />}
      <Inspiration />
    </div>
  );
}

export default Search;