# Duffel Flights API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel Flights API using a Flask backend. The integration allows you to list flight offers by making requests to the Duffel API. The backend is built using Python and Flask, while the frontend component is assumed to interact with this backend to display flight offers.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Flask
- Requests library
- Dotenv library
- Node.js and npm (for frontend, if applicable)
- Duffel API Key

### Backend Setup

#### Running Locally

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   Ensure you have Python and pip installed, then run:

   ```bash
   pip install flask requests python-dotenv
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

4. **Run the Server**

   Execute the following command to start the Flask server:

   ```bash
   python main.py
   ```

   The server will run on `http://localhost:5000`.

#### Running Remotely

To deploy the backend remotely, consider using platforms like Heroku, AWS, or Google Cloud. Ensure that your environment variables are set correctly on the remote server.

### Frontend Setup

The frontend component is assumed to interact with the backend API. Ensure that your frontend is configured to make requests to the backend endpoints.

#### Running Locally

1. **Navigate to the Frontend Directory**

   ```bash
   cd <frontend-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend**

   ```bash
   npm start
   ```

   Ensure that the frontend is configured to communicate with the backend at `http://localhost:5000`.

#### Running Remotely

Deploy the frontend using platforms like Vercel, Netlify, or any static hosting service. Ensure that the frontend is configured to communicate with the deployed backend URL.

### Testing Options

Integration tests are provided in `integration_tests.py`. To run the tests, execute:

```bash
python integration_tests.py
```

Ensure that the backend server is running before executing the tests.

## Troubleshooting Guide

- **Issue: Backend server not starting**

  - Ensure all dependencies are installed.
  - Check if the `.env` file is correctly configured with the Duffel API key.
  - Verify that the port `5000` is not in use by another application.

- **Issue: API requests failing**

  - Confirm that the Duffel API key is valid and has the necessary permissions.
  - Check the request payload for correctness.
  - Review the Duffel API documentation for any changes or updates.

- **Issue: Frontend not connecting to backend**

  - Verify that the frontend is configured to point to the correct backend URL.
  - Ensure CORS is enabled on the backend.

## Support Contact Information

For support, please contact:

- **Email:** support@example.com
- **Phone:** +1-234-567-890

## Links to API Provider Documentation

- [Duffel API Documentation](https://duffel.com/docs/api)

This documentation provides detailed information on the endpoints, request formats, and response structures for the Duffel API.