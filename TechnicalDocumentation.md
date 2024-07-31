# Duffel API Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Duffel API for flight search and booking functionalities. The integration consists of a backend server implemented in Python using Flask and a frontend component built with React. The backend server handles requests to the Duffel API for searching flights and placing orders, while the frontend provides a user interface for inputting search criteria and displaying results.

## Quick Start Guide

### Prerequisites

- Python 3.7+
- Node.js 12+
- npm (Node Package Manager)
- Duffel API Key

### Running the Backend Server

#### Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/duffel-integration.git
   cd duffel-integration/backend
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
   Create a `.env` file in the backend directory and add your Duffel API key:
   ```env
   DUFFEL_API_KEY=your_duffel_api_key
   ```

5. **Run the server:**
   ```bash
   flask run
   ```

#### Remotely

1. **Deploy to a cloud service (e.g., Heroku, AWS, GCP):**
   Follow the specific instructions for deploying a Flask application to your chosen cloud service. Ensure that you set the `DUFFEL_API_KEY` environment variable in your cloud service's configuration.

### Running the Frontend

#### Locally

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

#### Remotely

1. **Build the frontend for production:**
   ```bash
   npm run build
   ```

2. **Deploy the build directory to a static site hosting service (e.g., Netlify, Vercel):**
   Follow the specific instructions for deploying a React application to your chosen hosting service.

### Testing

1. **Navigate to the backend directory:**
   ```bash
   cd ../backend
   ```

2. **Run the integration tests:**
   ```bash
   pytest integration_tests.py
   ```

## Troubleshooting Guide

### Common Issues

1. **CORS Errors:**
   - Ensure that the Flask-CORS extension is properly configured in the backend.
   - Verify that the frontend is making requests to the correct backend URL.

2. **Environment Variables Not Loaded:**
   - Ensure that the `.env` file is present in the backend directory and contains the correct Duffel API key.
   - Verify that the `python-dotenv` package is installed and properly configured.

3. **API Request Failures:**
   - Check the console logs for detailed error messages.
   - Verify that the Duffel API key is valid and has the necessary permissions.

## Support

For support, please contact:

- **Email:** support@yourcompany.com
- **Phone:** +1-800-123-4567

## Links to API Provider Docs

- [Duffel API Documentation](https://duffel.com/docs)

This documentation should provide you with all the necessary information to get started with the Duffel API integration. If you encounter any issues or have further questions, please refer to the troubleshooting guide or contact support.