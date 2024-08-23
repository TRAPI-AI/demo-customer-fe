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
   ```sh
   git clone https://github.com/your-repo/demo-customer-be.git
   cd demo-customer-be
   ```

2. **Create a virtual environment and activate it:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Duffel API key:
   ```env
   DUFFEL_API_KEY=your_duffel_api_key
   ```

5. **Run the server:**
   ```sh
   python app.py
   ```

   The server will start on `http://localhost:5000`.

#### Running Remotely

1. **Deploy to a cloud service:**
   - Use platforms like Heroku, AWS, or Google Cloud to deploy your Flask application.
   - Ensure you set the `DUFFEL_API_KEY` environment variable in your cloud service settings.

### Frontend Setup

#### Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/demo-customer-fe.git
   cd demo-customer-fe
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the frontend:**
   ```sh
   npm start
   ```

   The frontend will start on `http://localhost:3000`.

#### Running Remotely

1. **Deploy to a cloud service:**
   - Use platforms like Vercel, Netlify, or AWS Amplify to deploy your React application.
   - Ensure the backend server URL is correctly set in your frontend code.

### Testing Options

- **Integration Tests:**
  Integration tests are written in `integration_tests.py`. To run the tests, use the following command:
  ```sh
  python -m unittest integration_tests.py
  ```

## Troubleshooting Guide

### Common Issues

1. **CORS Errors:**
   - Ensure that the Flask app has CORS enabled using `flask_cors.CORS`.

2. **Environment Variables Not Set:**
   - Verify that the `.env` file is correctly set up and the `DUFFEL_API_KEY` is valid.

3. **API Rate Limits:**
   - Duffel API has rate limits. Ensure your application handles rate limit errors gracefully.

4. **Invalid API Key:**
   - Double-check that the API key is correct and has the necessary permissions.

### Debugging Tips

- **Check Logs:**
  - Always check the server logs for any error messages.
- **Use Postman:**
  - Test the backend endpoints using Postman to ensure they are working as expected.

## Support Contact Info

For any issues or support, you can contact Duffel support at [support@duffel.com](mailto:support@duffel.com).

## Links to API Provider Docs

- [Duffel API Documentation](https://duffel.com/docs)

This documentation should help you get started with integrating Duffel API for flight offers. For more detailed information, refer to the official Duffel API documentation.