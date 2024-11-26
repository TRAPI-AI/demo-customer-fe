# Travel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight offers. The integration consists of a backend service built with Flask and a frontend component. The backend handles requests to the Duffel API, while the frontend interacts with users. This setup allows users to search for flight offers through the Duffel API seamlessly.

## Quick Start Guide

### Prerequisites

- Python 3.6 or higher
- Node.js and npm (for the frontend)
- A Duffel API key
- Environment variables set up in a `.env` file

### Running the Backend Server

#### Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key
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

#### Remotely

- Deploy the backend to a cloud service provider like Heroku, AWS, or Google Cloud.
- Ensure the environment variables are set in the cloud environment.

### Running the Frontend

#### Locally

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend:**

   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`.

#### Remotely

- Deploy the frontend to a hosting service like Vercel, Netlify, or AWS S3.
- Ensure the backend URL is correctly configured in the frontend application.

### Testing Options

- Integration tests are available in `integration_tests.py`.
- To run the tests, execute:

  ```bash
  python -m unittest integration_tests.py
  ```

## Troubleshooting Guide

- **Issue: Backend server not starting**
  - Ensure all dependencies are installed.
  - Check if the `.env` file is correctly configured with the Duffel API key.

- **Issue: 500 Internal Server Error**
  - Verify the Duffel API key is valid and has the necessary permissions.
  - Check the request payload for any missing or incorrect fields.

- **Issue: CORS errors in the frontend**
  - Ensure the Flask-CORS extension is correctly configured in `backend.py`.

## Support Contact Information

For support, please contact the development team at:

- Email: support@example.com
- Phone: +1-234-567-890

## Links to API Provider Documentation

- [Duffel API Documentation](https://duffel.com/docs/api)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Flask-CORS Documentation](https://flask-cors.readthedocs.io/en/latest/)

This documentation should provide a clear path to setting up and troubleshooting the integration with the Duffel API. For further assistance, refer to the support contact information provided.