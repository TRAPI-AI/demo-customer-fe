```javascript
// Integration tests for Duffel API based on the provided integration requirements

const axios = require('axios');
const assert = require('assert');

describe('Duffel API Integration Tests', () => {
  
  const baseURL = 'https://api.duffel.com/air/offer_requests';
  const accessToken = '<YOUR_ACCESS_TOKEN>'; // Replace with actual access token
  
  it('should create an offer request', async () => {
    const requestData = {
      data: {
        slices: [
          {
            origin: "LHR",
            destination: "JFK",
            departure_time: { to: "17:00", from: "09:45" },
            departure_date: "2020-04-24",
            arrival_time: { to: "17:00", from: "09:45" }
          }
        ],
        private_fares: {
          "QF": [{ corporate_code: "FLX53", tracking_reference: "ABN:2345678" }],
          "UA": [{ corporate_code: "1234", tour_code: "578DFL" }]
        },
        passengers: [
          { family_name: "Earhart", given_name: "Amelia", loyalty_programme_accounts: [{ account_number: "12901014", airline_iata_code: "BA" }], type: "adult" },
          { age: 14 },
          { fare_type: "student" },
          { age: 5, fare_type: "contract_bulk_child" }
        ],
        max_connections: 0,
        cabin_class: "economy"
      }
    };

    const response = await axios.post(baseURL, requestData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    assert.strictEqual(response.status, 200);
    assert(response.data.data.id);
  });

  it('should get an offer request by ID', async () => {
    const offerRequestId = 'orq_00009hjdomFOCJyxHG7k7k'; // Replace with an actual offer request ID

    const response = await axios.get(`${baseURL}/${offerRequestId}`, {
      headers: {
        'Accept': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    assert.strictEqual(response.status, 200);
    assert(response.data.data.id === offerRequestId);
  });

  it('should list offer requests', async () => {
    const response = await axios.get(baseURL, {
      headers: {
        'Accept': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    assert.strictEqual(response.status, 200);
    assert(response.data.data.length > 0);
  });

});
```
