Sure, here is a complete React component that you can copy and paste into your file. This component includes the necessary state variables, event handlers, and UI components. It also includes the function that makes the API call to the backend.

```jsx
import React, { useState } from 'react';

const App = () => {
  const [payload, setPayload] = useState({
    data: {
      slices: [
        {
          origin: '',
          destination: '',
          departure_date: ''
        }
      ],
      passengers: [
        {
          type: ''
        }
      ]
    }
  });
  const [response, setResponse] = useState(null);

  const handleRequest = async () => {
    try {
      const res = await fetch('http://localhost:5000/create-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      data: {
        ...payload.data,
        slices: [
          {
            ...payload.data.slices[0],
            [e.target.name]: e.target.value
          }
        ],
        passengers: [
          {
            type: e.target.value
          }
        ]
      }
    });
  };

  return (
    <div>
      <form>
        <label>
          Origin:
          <input type="text" name="origin" onChange={handleChange} />
        </label>
        <label>
          Destination:
          <input type="text" name="destination" onChange={handleChange} />
        </label>
        <label>
          Departure Date:
          <input type="date" name="departure_date" onChange={handleChange} />
        </label>
        <label>
          Passenger Type:
          <select name="type" onChange={handleChange}>
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
            <option value="young_adult">Young Adult</option>
            <option value="senior">Senior</option>
          </select>
        </label>
        <button type="button" onClick={handleRequest}>Send Request</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>Offer ID: {response.data.id}</p>
          <p>Created At: {response.data.created_at}</p>
          <p>Live Mode: {response.data.live_mode.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default App;
```

Please note that this code assumes that your backend server is running on `http://localhost:5000` and that it has an endpoint `/create-offer` that accepts POST requests. You may need to adjust these values based on your actual backend setup.