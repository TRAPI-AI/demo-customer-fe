# Jyrney API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Jyrney API for ride-hailing services. The integration consists of a backend server implemented in Python using Flask and a frontend component built with React. The backend handles authentication and communication with the Jyrney API, while the frontend provides a user interface for creating ride quotes and displaying available vehicles.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Node.js and npm
- Flask
- React

### Running the Backend Server

#### Locally

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

4. **Set environment variables:**
   Create a `.env` file in the root directory and add your Jyrney API credentials:
   ```env
   JYRNEY_CLIENT_ID=your_client_id
   JYRNEY_CLIENT_SECRET=your_client_secret
   ```

5. **Run the server:**
   ```bash
   flask run
   ```

#### Remotely

1. **Deploy to a cloud service (e.g., Heroku, AWS, GCP):**
   Follow the specific instructions for deploying a Flask application to your chosen cloud service.

2. **Set environment variables:**
   Ensure that your cloud service has the necessary environment variables set for `JYRNEY_CLIENT_ID` and `JYRNEY_CLIENT_SECRET`.

### Running the Frontend

#### Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend:**
   ```bash
   npm start
   ```

#### Remotely

1. **Deploy to a cloud service (e.g., Vercel, Netlify):**
   Follow the specific instructions for deploying a React application to your chosen cloud service.

### Testing

1. **Integration Tests:**
   We have written integration tests in `integration_tests.py`. To run the tests, use the following command:
   ```bash
   pytest integration_tests.py
   ```

## Troubleshooting Guide

### Common Issues

1. **Error retrieving token:**
   - Ensure that your `JYRNEY_CLIENT_ID` and `JYRNEY_CLIENT_SECRET` are correct.
   - Check if the Jyrney authentication endpoint is reachable.

2. **Error creating quote:**
   - Verify that the payload being sent to the Jyrney API is correctly formatted.
   - Ensure that all required fields are provided in the request.

3. **CORS issues:**
   - Make sure that the backend server has CORS enabled.
   - If deploying remotely, ensure that the frontend and backend are correctly configured to allow cross-origin requests.

## Support Contact Info

For support, please contact Jyrney support at [support@jyrney.com](mailto:support@jyrney.com).

## Links to API Provider Docs

For more detailed information about the Jyrney API, please refer to the [Jyrney Developer Portal](https://developer.jyrney.com).