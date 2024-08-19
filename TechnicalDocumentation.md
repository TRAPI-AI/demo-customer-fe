# SilverRail API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the SilverRail API for train ticket shopping. The integration consists of a backend service built with Flask and a frontend component built with React. The backend service handles requests to the SilverRail API, while the frontend provides a user interface for searching train tickets.

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

4. **Run the Flask server:**
   ```bash
   flask run
   ```

   The server will start on `http://localhost:5000`.

#### Remotely

1. **Deploy the Flask app to a cloud service provider (e.g., Heroku, AWS, GCP).**
2. **Ensure the environment variables and certificates are correctly set up on the remote server.**
3. **Start the Flask server using the provider's deployment instructions.**

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

3. **Start the React app:**
   ```bash
   npm start
   ```

   The app will start on `http://localhost:3000`.

#### Remotely

1. **Deploy the React app to a cloud service provider (e.g., Vercel, Netlify).**
2. **Ensure the backend server URL is correctly set in the frontend code.**
3. **Follow the provider's deployment instructions to start the React app.**

### Testing Options

1. **Integration Tests:**
   - Integration tests are located in `integration_tests.py`.
   - To run the tests, use the following command:
     ```bash
     pytest integration_tests.py
     ```

### Troubleshooting Guide

1. **Backend Issues:**
   - **Error: Failed to fetch data from SilverRail API:**
     - Ensure the SilverRail API endpoint is correct.
     - Verify that the certificate path is correct and the certificate is valid.
     - Check network connectivity to the SilverRail API.

2. **Frontend Issues:**
   - **Error: Network request failed:**
     - Ensure the backend server is running and accessible.
     - Verify the backend server URL in the frontend code.

3. **Common Issues:**
   - **CORS Errors:**
     - Ensure CORS is enabled on the backend server.
     - Verify that the frontend and backend are running on the correct ports.

### Support Contact Info

For support, please contact the development team at [support@example.com](mailto:support@example.com).

### Links to API Provider Docs

- [SilverRail API Documentation](https://developer.silverrailtech.com/)

---

This documentation provides a detailed guide to setting up and troubleshooting the SilverRail API integration. For further assistance, please refer to the support contact info or the API provider documentation.