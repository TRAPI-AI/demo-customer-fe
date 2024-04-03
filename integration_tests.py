```language
// Integration tests for Duffel API based on the provided integration requirements

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming the backend app file is named 'app.js'

chai.use(chaiHttp);
chai.should();

describe('Duffel API Integration Tests', () => {
  it('should create an offer request', (done) => {
    chai.request(app)
      .post('/api/offer-requests')
      .set('Authorization', 'Bearer <YOUR_ACCESS_TOKEN>')
      .send({
        data: {
          slices: [
            {
              origin: "LHR",
              destination: "JFK",
              departure_time: {
                to: "17:00",
                from: "09:45"
              },
              departure_date: "2020-04-24",
              arrival_time: {
                to: "17:00",
                from: "09:45"
              }
            }
          ],
          private_fares: {
            "QF": [
              {
                corporate_code: "FLX53",
                tracking_reference: "ABN:2345678"
              }
            ],
            "UA": [
              {
                corporate_code: "1234",
                tour_code: "578DFL"
              }
            ]
          },
          passengers: [
            {
              family_name: "Earhart",
              given_name: "Amelia",
              loyalty_programme_accounts: [
                {
                  account_number: "12901014",
                  airline_iata_code: "BA"
                }
              ],
              type: "adult"
            },
            {
              age: 14
            },
            {
              fare_type: "student"
            },
            {
              age: 5,
              fare_type: "contract_bulk_child"
            }
          ],
          max_connections: 0,
          cabin_class: "economy"
        }
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // Add more assertions as needed
        done();
      });
  });

  it('should get a single offer request by ID', (done) => {
    const offerRequestId = "orq_00009hjdomFOCJyxHG7k7k"; // Replace with a valid offer request ID
    chai.request(app)
      .get(`/api/offer-requests/${offerRequestId}`)
      .set('Authorization', 'Bearer <YOUR_ACCESS_TOKEN>')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // Add more assertions as needed
        done();
      });
  });

  it('should list offer requests', (done) => {
    chai.request(app)
      .get('/api/offer-requests')
      .set('Authorization', 'Bearer <YOUR_ACCESS_TOKEN>')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // Add more assertions as needed
        done();
      });
  });
});
```
Please replace `<YOUR_ACCESS_TOKEN>` with your actual Duffel API access token in the integration tests.