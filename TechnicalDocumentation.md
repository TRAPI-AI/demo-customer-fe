# Duffel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight offers. The integration consists of a backend server built with Flask and a frontend component built with React. The backend server handles requests to the Duffel API to fetch flight offers, while the frontend allows users to search for flights and view the offers.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Node.js and npm
- Duffel API Key
- Docker (for running remotely)

### Running the Backend Server Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set up a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Duffel API key:
   ```env
   DUFFEL_API_KEY=your_duffel_api_key
   ```

5. **Run the server:**
   ```bash
   flask run
   ```

### Running the Backend Server Remotely

1. **Build the Docker image:**
   ```bash
   docker build -t duffel-backend .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -d -p 5000:5000 --env-file .env duffel-backend
   ```

### Running the Frontend Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend server:**
   ```bash
   npm start
   ```

### Running the Frontend Remotely

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Serve the build directory using a static server or deploy to a hosting service like Vercel, Netlify, or GitHub Pages.**

### Testing Options

We have written integration tests in `integration_tests.py`. To run the tests:

1. **Ensure the backend server is running.**
2. **Run the tests:**
   ```bash
   python integration_tests.py
   ```

## Troubleshooting Guide

### Common Issues

1. **CORS Errors:**
   - Ensure that the Flask-CORS extension is properly configured.
   - Check that the frontend is making requests to the correct backend URL.

2. **Environment Variables Not Loaded:**
   - Ensure the `.env` file is in the root directory.
   - Verify that the `DUFFEL_API_KEY` is correctly set.

3. **API Request Failures:**
   - Check the Duffel API key and ensure it has the necessary permissions.
   - Verify the request payload structure matches the Duffel API requirements.

### Logs and Debugging

- **Backend Logs:**
  Check the console output where the Flask server is running for any error messages.
- **Frontend Logs:**
  Use the browser's developer tools to inspect console logs and network requests.

## Support Contact Info

For any issues or support, you can reach out to the Duffel support team:

- **Email:** support@duffel.com
- **Website:** [Duffel Support](https://duffel.com/support)

## Links to API Provider Docs

- [Duffel API Documentation](https://duffel.com/docs)
- [Duffel Offer Requests](https://duffel.com/docs/api/offer-requests)

This documentation should help you get started with integrating Duffel API for flight offers. If you encounter any issues, refer to the troubleshooting guide or contact support. Happy coding!