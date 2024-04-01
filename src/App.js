Based on your requirements, here is the complete React code. This code includes the `createOfferRequest` function, the `TravelForm` component, and the `App` component. 

```javascript
import React, { useState } from 'react';

// Backend function
async function createOfferRequest(data) {
    const response = await fetch('http://localhost:5000/api/offer_requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// TravelForm component
function TravelForm() {
    const [data, setData] = useState({
        origin: '',
        destination: '',
        departure_date: '',
        return_date: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createOfferRequest(data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Origin:
                <input type="text" name="origin" value={data.origin} onChange={handleChange} />
            </label>
            <label>
                Destination:
                <input type="text" name="destination" value={data.destination} onChange={handleChange} />
            </label>
            <label>
                Departure Date:
                <input type="date" name="departure_date" value={data.departure_date} onChange={handleChange} />
            </label>
            <label>
                Return Date:
                <input type="date" name="return_date" value={data.return_date} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

// App component
function App() {
    return (
        <div className="App">
            <TravelForm />
        </div>
    );
}

export default App;
```

Please note that this code assumes that the backend server is running on `http://localhost:5000` and the endpoint `/api/offer_requests` is correctly set up to handle the POST request. Also, the `createOfferRequest` function is defined in the same file as the React components. If it's in a separate file, you would need to import it.