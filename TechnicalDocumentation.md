# Duffel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight offers. The integration consists of a backend server implemented in Python using Flask and a frontend component built with React. The backend server communicates with the Duffel API to fetch flight offers based on user input from the frontend.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Node.js and npm
- Duffel API key

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
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Duffel API key:
   ```env
   DUFFEL_API_KEY=your_duffel_api_key
   ```

5. **Run the backend server:**
   ```bash
   flask run
   ```

#### Running Remotely

1. **Deploy to a cloud service:**
   - Use platforms like Heroku, AWS, or Google Cloud to deploy your Flask application.
   - Ensure environment variables are set up correctly on the cloud platform.

### Frontend Setup

#### Running Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend server:**
   ```bash
   npm start
   ```

#### Running Remotely

1. **Build the frontend application:**
   ```bash
   npm run build
   ```

2. **Deploy to a static site hosting service:**
   - Use platforms like Netlify, Vercel, or GitHub Pages to deploy your React application.
   - Ensure the backend server URL is correctly set in the frontend code.

### Testing Options

- **Integration Tests:**
  - Integration tests are written in `integration_tests.py`.
  - To run the tests, use the following command:
    ```bash
    pytest integration_tests.py
    ```

## Troubleshooting Guide

### Common Issues

1. **CORS Errors:**
   - Ensure that the Flask app has CORS enabled using `flask_cors.CORS`.

2. **Environment Variables Not Loaded:**
   - Verify that the `.env` file is correctly set up and the `python-dotenv` package is installed.

3. **API Key Errors:**
   - Ensure that the Duffel API key is valid and has the necessary permissions.

4. **Network Issues:**
   - Check your network connection and ensure that the Duffel API endpoint is reachable.

## Support Contact Info

- For issues related to the Duffel API, refer to the [Duffel API Documentation](https://duffel.com/docs).
- For support with the integration, contact the development team at `support@example.com`.

## Links to API Provider Docs

- [Duffel API Documentation](https://duffel.com/docs)
- [Duffel Offer Requests](https://duffel.com/docs/api/offer-requests)

This documentation should help you get started with the Duffel API integration and troubleshoot common issues. For further assistance, refer to the provided support contact information and API documentation links.