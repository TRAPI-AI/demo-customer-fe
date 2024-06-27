# Flight Data Integration Documentation

## Quick Start Guide

### Prerequisites

- Python 3.7+
- Flask
- Google Cloud Firestore
- Requests library
- dotenv library

### Setup

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**

    ```sh
    pip install -r requirements.txt
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    GOOGLE_APPLICATION_CREDENTIALS=<path-to-your-service-account-json>
    ```

4. **Run Firestore emulator (optional for local testing):**

    ```sh
    gcloud beta emulators firestore start
    ```

### Running the Backend Server

#### Locally

1. **Start the Flask server:**

    ```sh
    python app.py
    ```

    The server will run on `http://127.0.0.1:5000`.

#### Remotely

1. **Deploy to a cloud service (e.g., Google Cloud Run, AWS, Heroku):**

    Follow the specific cloud service's deployment instructions. Ensure that your environment variables are set up correctly in the cloud environment.

### Running the Frontend

#### Locally

1. **Navigate to the frontend directory:**

    ```sh
    cd frontend
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Start the frontend server:**

    ```sh
    npm start
    ```

    The frontend will run on `http://localhost:3000`.

#### Remotely

1. **Deploy to a cloud service (e.g., Vercel, Netlify):**

    Follow the specific cloud service's deployment instructions. Ensure that your environment variables are set up correctly in the cloud environment.

### Testing Options

1. **Run integration tests:**

    ```sh
    python integration_tests.py
    ```

    Ensure that the backend server is running before executing the tests.

## Troubleshooting Guide

### Common Issues

1. **Firestore connection issues:**

    - Ensure that your `GOOGLE_APPLICATION_CREDENTIALS` environment variable points to the correct service account JSON file.
    - If using the Firestore emulator, ensure it is running and the `FIRESTORE_EMULATOR_HOST` environment variable is set.

2. **API request failures:**

    - Verify that the `Subscription-Key` in the headers is correctly set.
    - Check the API provider's status page for any outages.

3. **Environment variable issues:**

    - Ensure that all required environment variables are set in your `.env` file or cloud environment.

### Logs

- Check the console output for any error messages.
- Use a logging framework to capture and analyze logs for more detailed troubleshooting.

## Support Contact Info

For support, please contact:

- **Email:** support@example.com
- **Phone:** +1-800-123-4567

## Links to API Provider Docs

- [OAG Flight Info API Documentation](https://developers.oag.com/api-details#api=flight-info-v2&operation=GetFlights)

---

This documentation provides a comprehensive guide to setting up, running, and troubleshooting the flight data integration. For any further assistance, please refer to the support contact info provided.