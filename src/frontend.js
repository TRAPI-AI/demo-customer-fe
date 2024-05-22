import React, { useState } from "react";
import Navbar from "./navbar";
import Tabs from "./Tabs";
import Air from "./Air";
import Stays from "./Stays";
import Cruises from "./Cruises";
import CarRentals from "./CarRentals";
import Esims from "./Esims";
import Inspiration from "./inspiration";

function Frontend() {
  const [activeTab, setActiveTab] = useState('Flights'); // Default to 'Flights'

  return (
    <div>
      <Navbar />
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === 'Flights' && <Air />}
      {activeTab === 'Stays' && <Stays />}
      {activeTab === 'Cruises' && <Cruises />}
      {activeTab === 'Car Rentals' && <CarRentals />}
      {activeTab === 'eSims' && <Esims />}
      <Inspiration />
    </div>
  );
}

export default Frontend;