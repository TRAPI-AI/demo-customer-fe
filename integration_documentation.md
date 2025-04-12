# Travel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to the integration of a travel API, specifically focusing on the Hotelbeds API. The integration allows users to search for travel-related data and check hotel availability through a backend service built with FastAPI. The backend service aggregates data from various sources and communicates with the Hotelbeds API to provide hotel availability information.

## Quick Start Guide

### Prerequisites

- Python 3.7 or higher
- FastAPI
- HTTP client library (e.g., `httpx` or `requests`)
- Access to the Hotelbeds API (API key and secret)

### Running the Backend Server Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set Environment Variables:**

   Ensure you have the following environment variables set:

   ```bash
   export HOTELBEDS_HOTEL_API_KEY=<your_api_key>
   export HOTELBEDS_HOTEL_SECRET=<your_secret>
   ```

4. **Start the FastAPI Server:**

   ```bash
   uvicorn src.routes:router --reload
   ```

   The server will be running at `http://127.0.0.1:8000`.

### Running the Backend Server Remotely

1. **Deploy to a Cloud Provider:**

   - Choose a cloud provider (e.g., AWS, Azure, Google Cloud).
   - Set up a virtual machine or container service.
   - Deploy the application using Docker or directly on the VM.

2. **Configure Environment Variables:**

   Ensure the environment variables for the API key and secret are set on the remote server.

3. **Start the Server:**

   Use a process manager like `gunicorn` or `supervisor` to run the server in a production environment.

### Running the Frontend Locally

1. **Navigate to the Frontend Directory:**

   ```bash
   cd <frontend-directory>
   ```

2. **Install Frontend Dependencies:**

   Use a package manager like `npm` or `yarn`:

   ```bash
   npm install
   ```

3. **Start the Frontend Server:**

   ```bash
   npm start
   ```

   The frontend will be running at `http://localhost:3000`.

### Running the Frontend Remotely

1. **Build the Frontend:**

   ```bash
   npm run build
   ```

2. **Deploy to a Hosting Service:**

   - Use a service like Vercel, Netlify, or a cloud provider.
   - Upload the build directory to the hosting service.

### Testing Options

- **Integration Tests:**

  The integration tests are located in `integration_tests.py`. To run the tests, use:

  ```bash
  pytest integration_tests.py
  ```

### Troubleshooting Guide

- **Common Issues:**

  - **500 Internal Server Error:** Check the server logs for detailed error messages.
  - **Invalid API Key/Secret:** Ensure the environment variables are correctly set.
  - **Network Issues:** Verify network connectivity and API endpoint accessibility.

- **Debugging Tips:**

  - Use logging to capture detailed information about requests and responses.
  - Test API calls independently using tools like Postman or curl.

### Support Contact Information

For support, please contact:

- **Email:** support@example.com
- **Phone:** +1-800-555-0199

### Links to API Provider Documentation

- [Hotelbeds API Documentation](https://developer.hotelbeds.com/documentation/hotels/overview)

This documentation should provide you with the necessary information to successfully integrate and run the travel API service. For further assistance, please refer to the support contact information provided above.