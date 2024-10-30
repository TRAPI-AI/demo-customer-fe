# Travel API Integration Documentation

## Table of Contents

- [General Overview](#general-overview)
- [Quick Start Guide](#quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Running the Backend Server](#running-the-backend-server)
    - [Locally](#running-the-backend-server-locally)
    - [Remotely](#running-the-backend-server-remotely)
  - [Running the Frontend Application](#running-the-frontend-application)
    - [Locally](#running-the-frontend-application-locally)
    - [Remotely](#running-the-frontend-application-remotely)
- [Testing](#testing)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Support](#support)
- [References](#references)

---

## General Overview

This integration connects your application with the [Duffel API](https://duffel.com/docs) to facilitate flight offer searches and bookings. The backend is built using Flask and serves as an intermediary between your frontend application and Duffel's services. It handles requests for flight offers based on user input and communicates securely with the Duffel API using your API keys.

### Key Features

- **Flight Offer Listing:** Retrieve available flight options based on user-defined criteria.
- **Secure API Communication:** Utilizes environment variables to manage sensitive API keys.
- **CORS Enabled:** Allows cross-origin requests to facilitate frontend integration.
- **Error Handling:** Provides meaningful error messages for easier debugging and user feedback.
- **Testing Suite:** Includes integration tests to ensure the reliability of the API endpoints.

---

## Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed and set up:

- **Python 3.7+**
- **Node.js and npm** (if frontend is built with JavaScript frameworks)
- **Git**
- **Docker** *(optional, for containerized deployment)*
- **Duffel Account:** Sign up at [Duffel](https://duffel.com) to obtain your API key.

### Running the Backend Server

The backend server is built with Flask and serves API endpoints for flight offer listings.

#### Running the Backend Server Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/demo-customer-be.git
   cd demo-customer-be
   ```

2. **Create a Virtual Environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the project root with the following content:

   ```env
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

5. **Run the Server**

   ```bash
   python app.py
   ```

   The backend server will start on `http://localhost:5000`.

#### Running the Backend Server Remotely

To deploy the backend server remotely, you can use platforms like **Heroku**, **AWS Elastic Beanstalk**, or **Docker**. Below is an example using Docker:

1. **Create a `Dockerfile`**

   ```dockerfile
   FROM python:3.9-slim

   WORKDIR /app

   COPY requirements.txt requirements.txt
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   ENV PORT=5000
   EXPOSE 5000

   CMD ["python", "app.py"]
   ```

2. **Build the Docker Image**

   ```bash
   docker build -t demo-customer-be .
   ```

3. **Run the Docker Container**

   ```bash
   docker run -d -p 5000:5000 --env DUFFEL_API_KEY=your_duffel_api_key_here demo-customer-be
   ```

   The backend server will be accessible on the host's port `5000`.

### Running the Frontend Application

*Note: Replace the following sections with specific instructions based on your frontend implementation.*

#### Running the Frontend Application Locally

1. **Navigate to Frontend Directory**

   ```bash
   cd demo-customer-fe
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file with necessary configurations, such as:

   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Start the Frontend Server**

   ```bash
   npm start
   ```

   The frontend will typically run on `http://localhost:3000`.

#### Running the Frontend Application Remotely

Deploy the frontend using platforms like **Netlify**, **Vercel**, or **AWS Amplify**. Ensure that environment variables are set appropriately in the deployment settings.

---

## Testing

We have implemented integration tests to ensure the reliability and correctness of the backend endpoints.

### Running Tests Locally

1. **Ensure Backend Server is Not Running**

   Make sure the backend server is stopped to avoid port conflicts.

2. **Run Integration Tests**

   ```bash
   python integration_tests.py
   ```

   The tests will execute and provide a summary of passed and failed tests.

### Test Coverage

The `integration_tests.py` covers the following scenarios:

- **Successful Flight Offer Retrieval:** Ensures valid requests return appropriate flight offers.
- **Invalid Input Handling:** Checks that the API gracefully handles and responds to invalid input data.
- **Error Responses from Duffel API:** Verifies that errors from the Duffel API are correctly propagated and handled.

*Note: Extend the test suite as needed to cover additional functionalities.*

---

## Troubleshooting Guide

### Common Issues

1. **Backend Server Fails to Start**

   - **Cause:** Missing environment variables.
   - **Solution:** Ensure that the `.env` file contains the `DUFFEL_API_KEY` and is correctly formatted.

2. **CORS Errors When Accessing Backend from Frontend**

   - **Cause:** CORS not properly configured.
   - **Solution:** Verify that Flask-CORS is correctly set up in `app.py` and that the frontend origin is allowed.

3. **Invalid Duffel API Key**

   - **Cause:** Incorrect or expired API key.
   - **Solution:** Check the `DUFFEL_API_KEY` in your `.env` file and ensure it is valid. Regenerate the key from [Duffel Dashboard](https://duffel.com/dashboard) if necessary.

4. **Network Issues When Communicating with Duffel API**

   - **Cause:** Internet connectivity problems or Duffel API downtime.
   - **Solution:** Check your network connection and verify Duffel API status on their [status page](https://status.duffel.com).

5. **Unexpected Server Errors (500)**

   - **Cause:** Unhandled exceptions in backend code.
   - **Solution:** Check server logs for detailed error messages and stack traces to identify and fix the issue.

### Debugging Steps

1. **Check Logs**

   Review the backend server logs to identify error messages or stack traces that can provide insights into the issue.

2. **Verify Environment Variables**

   Ensure all required environment variables are correctly set, especially `DUFFEL_API_KEY`.

3. **Test API Endpoints with Tools**

   Use tools like **Postman** or **cURL** to manually test API endpoints and verify their responses.

4. **Check Dependency Versions**

   Ensure that all dependencies are correctly installed and compatible. Review `requirements.txt` for version specifications.

---

## Support

For further assistance, please reach out through the following channels:

- **Email:** support@yourcompany.com
- **Slack:** Join our [Slack Workspace](https://yourcompany.slack.com) and post in the `#api-support` channel.
- **Issue Tracker:** Submit issues on our [GitHub Repository](https://github.com/your-repo/demo-customer-be/issues).

---

## References

- **Duffel API Documentation:** [https://duffel.com/docs](https://duffel.com/docs)
- **Flask Documentation:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
- **Flask-CORS Documentation:** [https://flask-cors.readthedocs.io/](https://flask-cors.readthedocs.io/)
- **Requests Library Documentation:** [https://docs.python-requests.org/](https://docs.python-requests.org/)
- **Environment Variables in Python:** [https://12factor.net/config](https://12factor.net/config)

---

*This documentation is maintained by the Development Team and is subject to updates. Please refer to the repository for the latest information.*