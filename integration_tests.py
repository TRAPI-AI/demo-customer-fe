```javascript
// Integration tests for the search_stays function

const { search_stays } = require('./your_integration_file'); // Import your integration file here
const assert = require('assert');

describe('Search Stays Integration Tests', () => {
    it('should return search results for stays based on provided parameters', async () => {
        const access_token = "YOUR_ACCESS_TOKEN";
        const check_in_date = "2023-01-15";
        const check_out_date = "2023-01-20";
        const adults = 2;
        const rooms = 1;
        const latitude = 37.7749;
        const longitude = -122.4194;
        const radius = 10;

        const response = await search_stays(access_token, check_in_date, check_out_date, adults, rooms, latitude, longitude, radius);

        assert(response.data.results.length > 0);
        assert(response.data.results[0].rooms === rooms);
        assert(response.data.results[0].check_in_date === check_in_date);
        assert(response.data.results[0].check_out_date === check_out_date);
        assert(response.data.results[0].adults === adults);
        assert(response.data.results[0].location.geographic_coordinates.latitude === latitude);
        assert(response.data.results[0].location.geographic_coordinates.longitude === longitude);
    });
});
```