// Adding integration code to the React file for Duffel API

import React, { useState } from "react";
import Routing from "./Routing";

function App() {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    slices: [{ origin: "", destination: "", departure_date: "" }],
    passengers: [{ type: "adult" }],
  });

  const handleInputChange = (e, index, field) => {
    const newSlices = [...formData.slices];
    newSlices[index][field] = e.target.value;
    setFormData({ ...formData, slices: newSlices });
  };

  const handlePassengerChange = (e, index) => {
    const newPassengers = [...formData.passengers];
    newPassengers[index].type = e.target.value;
    setFormData({ ...formData, passengers: newPassengers });
  };

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/duffel-flights-list-offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slices: formData.slices,
          passengers: formData.passengers,
        }),
      });

      const data = await response.json();
      setOffers(data.data.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Routing />
      <div>
        <h1>Search Flights</h1>
        {formData.slices.map((slice, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Origin"
              value={slice.origin}
              onChange={(e) => handleInputChange(e, index, "origin")}
            />
            <input
              type="text"
              placeholder="Destination"
              value={slice.destination}
              onChange={(e) => handleInputChange(e, index, "destination")}
            />
            <input
              type="date"
              value={slice.departure_date}
              onChange={(e) => handleInputChange(e, index, "departure_date")}
            />
          </div>
        ))}
        {formData.passengers.map((passenger, index) => (
          <select
            key={index}
            value={passenger.type}
            onChange={(e) => handlePassengerChange(e, index)}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant_without_seat">Infant without seat</option>
          </select>
        ))}
        <button onClick={fetchOffers}>Search</button>
        {loading && <p>Loading...</p>}
        <div>
          {offers.map((offer, index) => (
            <div key={index}>
              {offer.slices.map((slice, sliceIndex) => (
                <div key={sliceIndex}>
                  <h2>Slice {sliceIndex + 1}</h2>
                  <p>Origin: {slice.origin.name}</p>
                  <p>Destination: {slice.destination.name}</p>
                  {slice.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex}>
                      <p>Carrier: {segment.operating_carrier.name}</p>
                      <p>Departing at: {segment.departing_at}</p>
                      <p>Duration: {segment.duration}</p>
                      <p>Arriving at: {segment.arriving_at}</p>
                    </div>
                  ))}
                </div>
              ))}
              <p>Total Amount: {offer.total_amount}</p>
              <button>Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
// End of integration code
