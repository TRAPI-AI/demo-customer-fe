# Duffel Flights API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel Flights API using a Flask backend. The integration allows users to request flight offers from Duffel's API by sending a POST request to the `/duffel-flights-list-offers` endpoint. The backend is built using Flask and is designed to handle requests and responses efficiently. The integration also includes a frontend component to interact with the backend.

## Quick Start Guide

### Prerequisites

- Python 3.6 or higher
- Flask
- Requests library
- Dotenv library
- Node.js and npm (for frontend)
- Duffel API Key

### Running the Backend Server Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Server:**

   ```bash
   python main.py
   ```

   The server will start on `http://localhost:5000`.

### Running the Backend Server Remotely

To run the server remotely, deploy the Flask application to a cloud service provider such as Heroku, AWS, or Google Cloud. Ensure that the environment variables are set correctly on the remote server.

### Running the Frontend Locally

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend:**

   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`.

### Running the Frontend Remotely

Deploy the frontend application to a hosting service such as Vercel, Netlify, or AWS S3. Ensure that the backend URL is correctly configured in the frontend application.

### Testing Options

Integration tests are available in the `integration_tests.py` file. To run the tests, execute the following command:

```bash
pytest integration_tests.py
```

Ensure that the backend server is running before executing the tests.

## Troubleshooting Guide

- **Issue: Backend server not starting**
  - Ensure that all dependencies are installed.
  - Verify that the `.env` file contains the correct Duffel API key.
  - Check for any syntax errors in the code.

- **Issue: API requests failing**
  - Verify that the Duffel API key is valid and has the necessary permissions.
  - Check the request payload for correctness.
  - Review the Duffel API documentation for any changes or updates.

- **Issue: Frontend not connecting to backend**
  - Ensure that the backend server is running and accessible.
  - Verify that the frontend is configured with the correct backend URL.

## Support Contact Information

For support or further assistance, please contact:

- Email: support@example.com
- Phone: +1-800-555-0199

## Links to API Provider Documentation

- [Duffel API Documentation](https://duffel.com/docs/api)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Requests Library Documentation](https://docs.python-requests.org/en/master/)

This documentation should provide a clear and concise guide to setting up and troubleshooting the Duffel Flights API integration. For any additional questions or concerns, please refer to the support contact information provided above.