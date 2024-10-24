# Indie Campers Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Indie Campers API. The integration allows you to fetch a list of locations from Indie Campers, which can be used to display available car rental locations in your application. The integration consists of a backend service built with Flask and a frontend component built with React.

## Quick Start Guide

### Running the Backend Server

#### Locally

1. **Clone the Repository**: Clone the repository containing the backend code to your local machine.

2. **Install Dependencies**: Navigate to the backend directory and install the required Python packages using pip:
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Variables**: Ensure you have a `.env` file in the root of your backend directory with necessary environment variables.

4. **Run the Server**: Start the Flask server by running:
   ```bash
   python demo-customer-be.py
   ```
   The server will run on `http://localhost:5000`.

#### Remotely

1. **Deploy to a Server**: Deploy the Flask application to a cloud service provider like AWS, Heroku, or any other platform that supports Python applications.

2. **Environment Configuration**: Ensure all environment variables are set correctly on the remote server.

3. **Start the Application**: Use the platform's interface or CLI to start the application.

### Running the Frontend

#### Locally

1. **Navigate to Frontend Directory**: Go to the directory containing the React frontend code.

2. **Install Dependencies**: Run the following command to install necessary packages:
   ```bash
   npm install
   ```

3. **Start the Frontend**: Launch the React application using:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

#### Remotely

1. **Build the Application**: Create a production build of your React application:
   ```bash
   npm run build
   ```

2. **Deploy to a Hosting Service**: Upload the build directory to a static site hosting service like Netlify, Vercel, or AWS S3.

3. **Configure Backend URL**: Ensure the frontend is configured to communicate with the deployed backend server.

### Testing Options

- **Integration Tests**: Run the integration tests provided in `integration_tests.py` to ensure the backend is functioning correctly. Execute the tests using:
  ```bash
  python integration_tests.py
  ```

## Troubleshooting Guide

- **Backend Server Issues**: If the backend server fails to start, check for missing dependencies or incorrect environment variable configurations.
- **Frontend Loading Issues**: Ensure the backend server is running and accessible from the frontend. Check for CORS issues if the frontend cannot fetch data.
- **API Errors**: Verify the API endpoint and ensure the Indie Campers API is operational.

## Support Contact Information

For support, please contact the development team at [support@example.com](mailto:support@example.com).

## Links to API Provider Documentation

For more detailed information about the Indie Campers API, please refer to the [Indie Campers API Documentation](https://stag-indie-platform.goindie.online/api/docs).