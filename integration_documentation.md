# Duffel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight offers. The integration consists of a backend service built with Flask and a frontend component. The backend handles requests to the Duffel API, while the frontend interacts with the backend to display flight offers to users.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Flask
- Requests library
- Flask-CORS
- Dotenv
- Node.js and npm (for frontend, if applicable)

### Running the Backend Server Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```
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

### Running the Backend Server Remotely

1. **Deploy to a Cloud Provider:**

   - Use a platform like Heroku, AWS, or Google Cloud to deploy your Flask application.
   - Ensure environment variables are set in the cloud environment.

2. **Access the Remote Server:**

   - Once deployed, access the server using the provided URL by your cloud provider.

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

1. **Deploy to a Hosting Service:**

   - Use a service like Vercel, Netlify, or AWS Amplify to deploy your frontend application.

2. **Access the Remote Frontend:**

   - Once deployed, access the frontend using the provided URL by your hosting service.

### Testing Options

- **Integration Tests:**

  Run the integration tests using the following command:

  ```bash
  python -m unittest integration_tests.py
  ```

  Ensure the backend server is running before executing the tests.

## Troubleshooting Guide

- **Common Issues:**

  - **500 Internal Server Error:**
    - Check if the Duffel API key is correctly set in the `.env` file.
    - Ensure the Duffel API endpoint is reachable.

  - **CORS Issues:**
    - Verify that Flask-CORS is correctly configured in `backend.py`.

  - **Connection Refused:**
    - Ensure the backend server is running and accessible at the specified port.

- **Debugging:**

  - Use the `debug=True` flag in `app.run()` to enable detailed error logs.

## Support Contact Information

For support, please contact:

- **Email:** support@example.com
- **Phone:** +1-800-555-0199

## Links to API Provider Documentation

- [Duffel API Documentation](https://duffel.com/docs/api)

This documentation should help you set up and troubleshoot the Duffel API integration effectively. For further assistance, refer to the support contact information provided above.