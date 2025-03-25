# Duffel Flights API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel Flights API using a Node.js backend. The integration allows you to list flight offers by making requests to the Duffel API. The backend server is built using Express.js and Axios for handling HTTP requests.

## Quick Start Guide

### Prerequisites

- Node.js and npm installed on your machine.
- A Duffel API key. You can obtain one by signing up at [Duffel's website](https://duffel.com/).
- Ensure you have access to the internet to make API requests.

### Running the Backend Server Locally

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Environment Variables**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

### Running the Backend Server Remotely

1. **Deploy to a Cloud Provider**

   You can deploy the server to any cloud provider that supports Node.js applications, such as Heroku, AWS, or Google Cloud Platform.

2. **Set Environment Variables**

   Ensure that your cloud environment has the `DUFFEL_API_KEY` set as an environment variable.

3. **Access the Server**

   Once deployed, access the server using the URL provided by your cloud provider.

### Running the Frontend Locally

- The frontend is not covered in this documentation. Ensure you have a compatible frontend that can make POST requests to the backend endpoint `/duffel-flights-list-offers`.

### Running the Frontend Remotely

- Deploy your frontend application to a hosting service and configure it to communicate with the backend server's remote URL.

### Testing Options

- Integration tests are available in the `integration_tests.py` file. Ensure you have Python installed to run these tests.

  ```bash
  python integration_tests.py
  ```

## Troubleshooting Guide

- **CORS Issues**: Ensure that the backend server has the correct CORS headers set. The current configuration allows all origins.

- **Invalid API Key**: Double-check that the `DUFFEL_API_KEY` is correctly set in your environment variables.

- **Network Errors**: Verify your internet connection and ensure that the Duffel API endpoint is reachable.

- **Server Not Starting**: Ensure that no other process is using port 5000 or change the port in `server.js`.

## Support Contact Info

- For issues related to the Duffel API, refer to [Duffel's support page](https://duffel.com/support).
- For issues related to this integration, please contact the repository maintainer.

## Links to API Provider Docs

- [Duffel API Documentation](https://duffel.com/docs/api)
- [Duffel API Authentication](https://duffel.com/docs/api/authentication)

This documentation should help you get started with integrating and running the Duffel Flights API. For further assistance, refer to the support contact info or the API provider's documentation.