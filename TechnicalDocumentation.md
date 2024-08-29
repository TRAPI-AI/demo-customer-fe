# Duffel Stays Integration Documentation

## General Overview

This integration allows users to search for accommodations using the Duffel Stays API. The backend is implemented using Flask and handles requests to the Duffel Stays API, while the frontend is built with React and provides a user interface for searching accommodations.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn
- Duffel Stays API Key

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a virtual environment and activate it:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required packages:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Duffel Stays API key:
   ```env
   DUFFEL_STAYS_API_KEY=your_duffel_stays_api_key
   ```

5. **Run the backend server locally:**
   ```sh
   python app.py
   ```
   The server will start on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd frontend
   ```

2. **Install the required packages:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the frontend locally:**
   ```sh
   npm start
   # or
   yarn start
   ```
   The frontend will start on `http://localhost:3000`.

### Running Remotely

To run the backend and frontend remotely, you can deploy them to a cloud service provider like Heroku, AWS, or any other platform of your choice. Ensure that the environment variables are set correctly on the remote server.

### Testing

We have written integration tests in `integration_tests.py`. To run the tests, use the following command:
```sh
pytest integration_tests.py
```

## Troubleshooting Guide

### Common Issues

1. **CORS Issues:**
   Ensure that the Flask app has CORS enabled. You can use the `flask_cors` library to handle CORS.

2. **Environment Variables:**
   Make sure that the `.env` file is correctly set up and that the Duffel Stays API key is valid.

3. **Network Errors:**
   Check your network connection and ensure that the Duffel Stays API endpoint is reachable.

4. **Invalid API Key:**
   Verify that the API key is correct and has the necessary permissions.

### Logs and Debugging

- Check the backend server logs for any errors or exceptions.
- Use browser developer tools to inspect network requests and responses.

## Support Contact

For any issues or support, you can contact Duffel Stays support at stays@duffel.com.

## Links to API Provider Docs

- [Duffel Stays API Documentation](https://duffel.com/docs/stays)

This documentation provides detailed information on the API endpoints, request parameters, and response formats.