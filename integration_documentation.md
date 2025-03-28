# Duffel Flights API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel Flights API using a Flask-based backend server. The integration allows users to list flight offers by making requests to the Duffel API. The backend server is designed to handle requests and responses efficiently, ensuring seamless communication with the Duffel API.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Flask
- Flask-CORS
- Requests library
- Dotenv library
- Duffel API Key

### Running the Backend Server Locally

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   Ensure you have Python and pip installed. Then, install the required Python packages:

   ```bash
   pip install flask flask-cors requests python-dotenv
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory of your project and add your Duffel API key:

   ```plaintext
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

4. **Run the Server:**

   Start the Flask server by executing the following command:

   ```bash
   python search.py
   ```

   The server will run on `http://0.0.0.0:5000`.

### Running the Backend Server Remotely

To deploy the server remotely, you can use platforms like Heroku, AWS, or any other cloud service provider. Ensure that your environment variables are set up correctly on the remote server.

### Running the Frontend Locally

Assuming you have a frontend application that interacts with this backend:

1. **Navigate to the Frontend Directory:**

   ```bash
   cd <frontend-directory>
   ```

2. **Install Frontend Dependencies:**

   Use npm or yarn to install the necessary packages:

   ```bash
   npm install
   ```

3. **Run the Frontend:**

   Start the frontend application:

   ```bash
   npm start
   ```

   Ensure that the frontend is configured to communicate with the backend server at `http://localhost:5000`.

### Running the Frontend Remotely

Deploy the frontend application using services like Vercel, Netlify, or any other hosting provider. Ensure that the backend URL is correctly set to the remote server's address.

### Testing Options

Integration tests are available in the `integration_tests.py` file. To run the tests, execute:

```bash
python integration_tests.py
```

Ensure that the backend server is running before executing the tests.

## Troubleshooting Guide

- **Issue: Server not starting**
  - Ensure all dependencies are installed.
  - Check if the `.env` file is correctly configured with the Duffel API key.

- **Issue: API requests failing**
  - Verify that the Duffel API key is valid and has the necessary permissions.
  - Check network connectivity and ensure the Duffel API endpoint is reachable.

- **Issue: CORS errors**
  - Ensure that the frontend and backend are correctly configured to allow cross-origin requests.

## Support Contact Information

For support, please contact the development team at:

- Email: support@example.com
- Phone: +1-234-567-890

## Links to API Provider Documentation

For more information on the Duffel API, please refer to the official documentation:

- [Duffel API Documentation](https://duffel.com/docs/api)

This documentation provides detailed information on available endpoints, request/response formats, and other integration details.