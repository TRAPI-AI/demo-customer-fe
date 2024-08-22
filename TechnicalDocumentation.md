# Simtex eSIM Integration Documentation

## General Overview

This documentation provides a comprehensive guide to integrating with the Simtex eSIM API. The integration allows users to search for eSIM quotes based on destination countries and duration of stay, and to display these quotes on a frontend interface. The backend is built using Flask, and the frontend is built using React.

## Quick Start Guide

### Prerequisites

- Python 3.x
- Node.js and npm
- Flask
- React
- Simtex API Key

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
   Create a `.env` file in the root directory and add your Simtex API key:
   ```env
   SIMTEX_API_KEY=your_simtex_api_key
   ```

5. **Run the Flask server:**
   ```bash
   flask run
   ```

#### Running Remotely

1. **Deploy to a cloud service (e.g., Heroku, AWS, GCP):**
   Follow the specific instructions for deploying a Flask app to your chosen cloud service.

2. **Set environment variables on the cloud service:**
   Ensure that the `SIMTEX_API_KEY` is set in the environment variables of your cloud service.

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

3. **Run the React app:**
   ```bash
   npm start
   ```

#### Running Remotely

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Deploy the build directory to a static site hosting service (e.g., Netlify, Vercel):**
   Follow the specific instructions for deploying a React app to your chosen hosting service.

### Testing

1. **Run integration tests:**
   Ensure you have the necessary testing framework installed (e.g., pytest).
   ```bash
   pytest integration_tests.py
   ```

## Troubleshooting Guide

### Common Issues

1. **CORS Issues:**
   - Ensure that the Flask app has CORS enabled.
   - Check that the frontend is making requests to the correct backend URL.

2. **Environment Variables:**
   - Ensure that the `SIMTEX_API_KEY` is correctly set in the environment variables.

3. **API Errors:**
   - Check the response from the Simtex API for any error messages.
   - Ensure that the payload being sent to the Simtex API is correctly formatted.

### Debugging Tips

- Use `console.log` in the frontend and `print` statements in the backend to debug issues.
- Check the network tab in the browser's developer tools to inspect API requests and responses.

## Support Contact

For any issues or questions regarding the integration, please contact Simtex support:

- **Email:** support@simtex.io
- **Phone:** +1-800-123-4567

## Links to API Provider Docs

- [Simtex API Documentation](https://docs.simtex.io)

This documentation should help you get started with integrating the Simtex eSIM API into your application. If you encounter any issues, refer to the troubleshooting guide or contact support for further assistance.