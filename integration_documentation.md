# Travel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight offers. The integration consists of a backend service built with Flask and a frontend component. The backend service handles requests to the Duffel API, while the frontend component interacts with the backend to display flight offers to users.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Flask
- Flask-CORS
- Requests library
- Node.js and npm (for frontend)
- Duffel API Key

### Backend Setup

#### Running Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   Ensure you have Python and pip installed. Then, run:

   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

4. **Run the Server:**

   Execute the following command to start the Flask server:

   ```bash
   python main.py
   ```

   The server will run on `http://localhost:5000`.

#### Running Remotely

To deploy the backend remotely, you can use platforms like Heroku, AWS, or any other cloud service that supports Python applications. Ensure that your environment variables are set correctly on the remote server.

### Frontend Setup

#### Running Locally

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   Run the following command to install necessary packages:

   ```bash
   npm install
   ```

3. **Run the Frontend:**

   Start the frontend application with:

   ```bash
   npm start
   ```

   The frontend will typically run on `http://localhost:3000`.

#### Running Remotely

Deploy the frontend using services like Vercel, Netlify, or any other static site hosting service. Ensure that the backend API URL is correctly configured in the frontend application.

### Testing Options

Integration tests are available in the `integration_tests.py` file. To run the tests, execute:

```bash
python integration_tests.py
```

Ensure that the backend server is running before executing the tests.

## Troubleshooting Guide

- **Issue: Backend server not starting**
  - Ensure all dependencies are installed.
  - Check if the `.env` file is correctly configured with the Duffel API key.
  - Verify that the port 5000 is not in use by another application.

- **Issue: Frontend not connecting to backend**
  - Confirm that the backend server is running.
  - Check the network requests in the browser's developer tools to ensure the correct API endpoint is being called.

- **Issue: API requests failing**
  - Verify that the Duffel API key is valid and has the necessary permissions.
  - Check the API provider's status page for any outages.

## Support Contact Information

For support, please contact the development team at:

- Email: support@example.com
- Phone: +1-234-567-8901

## Links to API Provider Documentation

- [Duffel API Documentation](https://duffel.com/docs/api)

This documentation should provide you with the necessary information to successfully integrate and troubleshoot the Duffel API for flight offers. For further assistance, please refer to the support contact information provided above.