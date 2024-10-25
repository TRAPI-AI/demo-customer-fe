import React, { useState } from 'react';

const Flights = () => {
  // State fields
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerType, setPassengerType] = useState('adult');
  const [maxConnections, setMaxConnections] = useState('');
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passengerId, setPassengerId] = useState(null);

  // Function to handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare the data to send
    const requestData = {
      data: {
        slices: [
          {
            origin,
            destination,
            departure_date: departureDate,
          },
        ],
        passengers: [
          {
            type: passengerType,
          },
        ],
        max_connections: maxConnections ? parseInt(maxConnections, 10) : 0,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/duffel-flights-list-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const offersData = await response.json();
      setOffers(offersData.data.offers);
    } catch (error) {
      console.error('Error fetching flight offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle offer selection
  const handleSelectOffer = (offer) => {
    if (
      offer.slices &&
      offer.slices.length > 0 &&
      offer.slices[0].segments &&
      offer.slices[0].segments.length > 0 &&
      offer.slices[0].segments[0].passengers &&
      offer.slices[0].segments[0].passengers.length > 0
    ) {
      const selectedPassengerId = offer.slices[0].segments[0].passengers[0].passenger_id;
      setPassengerId(selectedPassengerId);
      console.log('Selected Passenger ID:', selectedPassengerId);
    } else {
      console.warn('Passenger ID not found for the selected offer.');
    }
  };

  return (
    <div>
      <div className="search-area">
        <div className="search">
          <form onSubmit={handleSearch}>
            {/* Origin Input */}
            <input
              type="text"
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />

            {/* Destination Input */}
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />

            {/* Departure Date Picker */}
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />

            {/* Passenger Type Dropdown */}
            <select
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value)}
              required
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="infant_without_seat">Infant Without Seat</option>
            </select>

            {/* Max Connections Input */}
            <input
              type="number"
              placeholder="Max Connections"
              value={maxConnections}
              onChange={(e) => setMaxConnections(e.target.value)}
              min="0"
            />

            {/* Search Button */}
            <button type="submit">Search</button>
          </form>

          {/* Loading Indicator */}
          {isLoading && <div className="loading">Loading...</div>}
        </div>
      </div>

      {/* Response Items */}
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <li
              key={index}
              className="offer-item"
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '15px',
                marginBottom: '15px',
                listStyleType: 'none',
              }}
            >
              <p><strong>Total Amount:</strong> {offer.total_amount}</p>

              {offer.slices && offer.slices.length > 0 && (
                <div>
                  <p>
                    <strong>Origin:</strong> {offer.slices[0].origin.name}
                  </p>
                  <p>
                    <strong>Destination:</strong> {offer.slices[0].destination.name}
                  </p>

                  {offer.slices[0].segments && offer.slices[0].segments.length > 0 && (
                    <div>
                      <p>
                        <strong>Operating Carrier:</strong> {offer.slices[0].segments[0].operating_carrier.name}
                      </p>
                      <p>
                        <strong>Departing At:</strong> {new Date(offer.slices[0].segments[0].departing_at).toLocaleString()}
                      </p>
                      <p>
                        <strong>Duration:</strong> {offer.slices[0].segments[0].duration}
                      </p>
                      <p>
                        <strong>Arriving At:</strong> {new Date(offer.slices[0].segments[0].arriving_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => handleSelectOffer(offer)}
                style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Select
              </button>
            </li>
          ))
        ) : (
          !isLoading && <li className="offer-item">No offers found.</li>
        )}
      </ul>

      {/* Display Selected Passenger ID */}
      {passengerId && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '5px' }}>
          <p><strong>Selected Passenger ID:</strong> {passengerId}</p>
        </div>
      )}
    </div>
  );
};

export default Flights;


### Explanation of the Implementation

1. **State Management**:
   - **Input Fields**: `origin`, `destination`, `departureDate`, `passengerType`, and `maxConnections` manage the values of the respective form fields.
   - **Offers**: `offers` stores the list of flight offers received from the backend.
   - **Loading State**: `isLoading` indicates whether a request is in progress, allowing the UI to display a loading indicator.
   - **Passenger ID**: `passengerId` stores the selected passenger's ID when a user selects an offer.

2. **Form Fields**:
   - **Origin & Destination**: Text inputs for users to enter the departure and arrival locations.
   - **Departure Date**: A date picker for selecting the departure date.
   - **Passenger Type**: A dropdown (`select`) with options for adult, child, and infant without seat.
   - **Max Connections**: A number input to specify the maximum number of connections.

3. **Form Submission (`handleSearch`)**:
   - Prevents the default form submission behavior.
   - Sets the loading state to `true` to display the loading indicator.
   - Constructs the `requestData` object as per the required structure, ensuring `slices` and `passengers` are arrays.
   - Sends a `POST` request to `http://localhost:5000/duffel-flights-list-offers` with the JSON payload.
   - Handles the response by updating the `offers` state with the received data (`offersData.data.offers`).
   - Catches and logs any errors that occur during the fetch operation.
   - Finally, sets the loading state back to `false` regardless of the request outcome.

4. **Rendering Offers**:
   - If offers are available, it maps through the `offers` array and displays each offer inside a `<li>` element with a styled border.
   - For each offer, it displays:
     - **Total Amount**: The `total_amount` of the offer.
     - **Origin & Destination**: The `name` of the origin and destination from the first slice.
     - **Operating Carrier Details**: From the first segment of the first slice, it displays the `operating_carrier.name`, `departing_at`, `duration`, and `arriving_at`.
   - Each offer item includes a **Select** button, which when clicked, stores the `passenger_id` from the first passenger of the first segment of the first slice into the `passengerId` state.

5. **Offer Selection (`handleSelectOffer`)**:
   - When the **Select** button is clicked, the `handleSelectOffer` function extracts the `passenger_id` from the offer's first slice, first segment, and first passenger.
   - It updates the `passengerId` state with the extracted `passenger_id` and logs it to the console.
   - If the `passenger_id` is not found, it logs a warning.

6. **Styling**:
   - Each offer item (`<li>`) is styled with a light border, padding, and margin for better visual separation.
   - The **Select** button is styled with a blue background, white text, and rounded corners to make it prominent and user-friendly.
   - The selected `passengerId` is displayed in a highlighted box below the offers list to provide feedback to the user.

7. **Loading Indicator**:
   - While the request is in progress (`isLoading` is `true`), a loading message is displayed to inform the user.

8. **No Offers Found Message**:
   - If no offers are available and not loading, a message indicating that no offers were found is displayed.

### Notes

- **Backend Integration**: Ensure that the backend at `http://localhost:5000/duffel-flights-list-offers` is correctly set up to handle the POST request with the specified data structure and respond with the expected JSON format.
  
- **Error Handling**: Basic error handling is implemented to log errors to the console. Depending on the application's requirements, you might want to enhance this by displaying error messages to users.

- **Passenger ID Usage**: Currently, the selected `passengerId` is stored in the state and displayed below the offers list. Depending on the application's needs, you might want to use this ID for further actions, such as booking or displaying additional passenger details.

- **Data Validation**: Additional validation can be added to ensure that the data received from the backend matches the expected structure, enhancing the application's robustness.

- **Styling Enhancements**: For a more polished UI, consider using CSS frameworks like Bootstrap or Tailwind CSS, or implement custom styles as needed.

- **Performance Considerations**: For large datasets, consider implementing pagination or lazy loading to improve performance and user experience.