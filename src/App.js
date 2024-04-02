Sure, here is the updated React component with inline styling that matches the existing page:

```jsx
import React, { useState } from 'react';

const SimtexEsimSearch = () => {
    const [payload, setPayload] = useState({ destinations: [{ countryCode: "", days: 0 }] });
    const [quotes, setQuotes] = useState([]);
    const [error, setError] = useState("");

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...payload.destinations];
        list[index][name] = value;
        setPayload(prevState => ({ ...prevState, destinations: list }));
    };

    const fetchQuotes = async () => {
        const response = await fetch('http://localhost:5000/simtex-esim-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            setQuotes(data.quoteOptions);
            setError("");
        } else {
            const errorData = await response.json();
            setError(errorData.errors[0]);
            console.error('Error:', response.status);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            minHeight: "100vh",
            backgroundColor: "deeppink",
        }}>
            {payload.destinations.map((x, i) => {
                return (
                    <div key={i}>
                        <input
                            name="countryCode"
                            placeholder="Country Code"
                            value={x.countryCode}
                            onChange={e => handleInputChange(e, i)}
                            style={{
                                padding: "20px",
                                margin: "10px 0",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                width: "50%",
                                backgroundColor: "rgba(255, 255, 255, 1)",
                            }}
                        />
                        <input
                            name="days"
                            placeholder="Days"
                            value={x.days}
                            onChange={e => handleInputChange(e, i)}
                            style={{
                                padding: "20px",
                                margin: "10px 0",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                width: "50%",
                                backgroundColor: "rgba(255, 255, 255, 1)",
                            }}
                        />
                    </div>
                );
            })}
            <button onClick={fetchQuotes} style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "10px",
            }}>Fetch Quotes</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {quotes.map((quote, index) => (
                <div key={index} style={{
                    margin: "10px 0",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid black",
                }}>
                    <p>Price: {quote.price}</p>
                    <p>QuotaGB: {quote.totalQuotaGB}</p>
                </div>
            ))}
        </div>
    );
};

export default SimtexEsimSearch;
```

In this updated component, I've added inline styles to the div, input fields, button, and quote elements to match the existing page. The styles include flexbox layout, padding, border radius, border color, and background color. The error message is styled with red color.