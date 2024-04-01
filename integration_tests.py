Based on the provided information, here is a simple integration test for the `createOfferRequest` function using Jest, a popular JavaScript testing framework. This test will ensure that the function is correctly making a POST request to the `/api/offer_requests` endpoint and handling the response.

```javascript
const fetch = require('node-fetch');
const createOfferRequest = require('./createOfferRequest'); // assuming the function is exported from this file

jest.mock('node-fetch');

describe('createOfferRequest', () => {
  it('should make a POST request to /api/offer_requests and return the response', async () => {
    const mockResponse = { id: 'offer_123', status: 'success' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      status: 200
    });

    const data = { /* your test data here */ };
    const response = await createOfferRequest(data);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/offer_requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error if the response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400
    });

    const data = { /* your test data here */ };
    await expect(createOfferRequest(data)).rejects.toThrow('HTTP error! status: 400');
  });
});
```

This test suite includes two tests:

1. The first test checks that `createOfferRequest` is making a POST request to the correct endpoint with the correct headers and body, and that it returns the response from the API.

2. The second test checks that `createOfferRequest` throws an error if the response from the API is not ok (i.e., the status code is not in the 200-299 range).

Remember to replace `/* your test data here */` with the actual data you want to use for testing.