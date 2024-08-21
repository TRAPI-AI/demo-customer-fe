# Duffel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight search functionality. The integration consists of a backend server built with Flask and a frontend component built with React. The backend server handles requests to the Duffel API to fetch flight offers, while the frontend provides a user interface for searching flights and displaying the results.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Node.js and npm
- Duffel API Key

### Backend Setup

#### Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install the required packages:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set the Duffel API Key:**
   ```bash
   export DUFFEL_API_KEY='your_duffel_api_key'  # On Windows, use `set DUFFEL_API_KEY=your_duffel_api_key`
   ```

5. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The server will start on `http://localhost:5000`.

#### Running Remotely

1. **Deploy the Flask app to a cloud service (e.g., Heroku, AWS, GCP).**
2. **Set the environment variable `DUFFEL_API_KEY` on the cloud service.**
3. **Ensure the server is running and accessible via a public URL.**

### Frontend Setup

#### Running Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install the required packages:**
   ```bash
   npm install
   ```

3. **Start the React app:**
   ```bash
   npm start
   ```

   The app will start on `http://localhost:3000`.

#### Running Remotely

1. **Deploy the React app to a cloud service (e.g., Vercel, Netlify).**
2. **Ensure the backend server URL is correctly set in the frontend code.**

### Testing

1. **Navigate to the tests directory:**
   ```bash
   cd tests
   ```

2. **Run the integration tests:**
   ```bash
   pytest integration_tests.py
   ```

## Troubleshooting Guide

### Common Issues

1. **CORS Errors:**
   - Ensure that the Flask app has CORS enabled.
   - Verify that the frontend is making requests to the correct backend URL.

2. **Invalid Duffel API Key:**
   - Double-check that the `DUFFEL_API_KEY` environment variable is set correctly.
   - Ensure that the API key has the necessary permissions.

3. **Network Errors:**
   - Verify that the backend server is running and accessible.
   - Check for any network issues that might be blocking the requests.

### Debugging Tips

- Use `console.log` in the frontend and `print` statements in the backend to log information.
- Check the browser's developer console for any errors or warnings.
- Use tools like Postman to test the backend endpoints independently.

## Support Contact

For any issues or questions, please contact the support team at [support@yourcompany.com](mailto:support@yourcompany.com).

## Links to API Provider Docs

- [Duffel API Documentation](https://duffel.com/docs)

This documentation should help you get started with integrating the Duffel API for flight search functionality. If you encounter any issues, refer to the troubleshooting guide or contact support for assistance.