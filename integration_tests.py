Here are some integration tests for the Duffel API based on the documentation provided. These tests are written in JavaScript using the Mocha testing framework and the Chai assertion library.

```javascript
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Duffel API Integration Tests', function() {
  const API_URL = 'https://duffel.com/api';

  it('should successfully search for stays', function(done) {
    chai.request(API_URL)
      .get('/stays')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should successfully get stay details', function(done) {
    const stayId = 'some-stay-id'; // Replace with a valid stay ID
    chai.request(API_URL)
      .get(`/stays/${stayId}`)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should successfully create a booking', function(done) {
    const bookingData = {}; // Replace with valid booking data
    chai.request(API_URL)
      .post('/bookings')
      .send(bookingData)
      .end(function(err, res) {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should successfully get booking details', function(done) {
    const bookingId = 'some-booking-id'; // Replace with a valid booking ID
    chai.request(API_URL)
      .get(`/bookings/${bookingId}`)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should successfully cancel a booking', function(done) {
    const bookingId = 'some-booking-id'; // Replace with a valid booking ID
    chai.request(API_URL)
      .delete(`/bookings/${bookingId}`)
      .end(function(err, res) {
        expect(res).to.have.status(204);
        done();
      });
  });
});
```

Please replace the placeholders with valid data before running the tests.