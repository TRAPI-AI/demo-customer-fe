# Travel API Integration Documentation

## Table of Contents

- [General Overview](#general-overview)
- [Quick Start Guide](#quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Running the Backend Server](#running-the-backend-server)
    - [Locally](#locally)
    - [Remotely](#remotely)
  - [Running the Frontend](#running-the-frontend)
    - [Locally](#locally-1)
    - [Remotely](#remotely-1)
  - [Testing the Integration](#testing-the-integration)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Support Contact Information](#support-contact-information)
- [Additional Resources](#additional-resources)

---

## General Overview

This integration connects your application with the Duffel API to fetch and manage flight offers seamlessly. The backend is built using Flask, providing a secure endpoint `/duffel-flights-list-offers` that communicates with Duffel's `offer_requests` API. The frontend component interacts with this backend to display flight offers to users.

**Key Features:**

- **Secure API Integration:** Utilizes environment variables to manage sensitive API keys.
- **CORS Enabled:** Allows cross-origin requests facilitating frontend integration.
- **Error Handling:** Gracefully manages and returns errors from the Duffel API.
- **Extensible Architecture:** Easily extendable to incorporate additional Duffel API endpoints.

---

## Quick Start Guide

### Prerequisites

Before setting up the integration, ensure you have the following:

- **Python 3.7+**
- **Node.js and npm** (if applicable for frontend)
- **Duffel API Key:** Obtain from your [Duffel Dashboard](https://dev.duffel.com/dashboard).
- **Git:** For version control and cloning the repository.

### Running the Backend Server

The backend is built with Flask and serves as the intermediary between your frontend and the Duffel API.

#### Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo/demo-customer-be.git
   cd demo-customer-be
   ```

2. **Create a Virtual Environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables:**

   Create a `.env` file in the project root:

   ```env
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

5. **Run the Server:**

   ```bash
   python app.py
   ```

   The server will start on `http://localhost:5000`.

#### Remotely

To deploy the backend server remotely, you can use platforms like **Heroku**, **AWS Elastic Beanstalk**, or **Docker**. Below is an example using **Heroku**:

1. **Login to Heroku:**

   ```bash
   heroku login
   ```

2. **Create a Heroku App:**

   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables:**

   ```bash
   heroku config:set DUFFEL_API_KEY=your_duffel_api_key_here
   ```

4. **Deploy the Code:**

   ```bash
   git push heroku main
   ```

5. **Scale the App:**

   ```bash
   heroku ps:scale web=1
   ```

   Your backend will be accessible via `https://your-app-name.herokuapp.com`.

### Running the Frontend

*Note: Replace placeholder steps with actual frontend repository details and setup instructions.*

#### Locally

1. **Navigate to Frontend Directory:**

   ```bash
   cd demo-customer-fe
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file:

   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Run the Frontend:**

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

#### Remotely

Deploy the frontend using platforms like **Vercel**, **Netlify**, or **Heroku**. Example using **Netlify**:

1. **Login to Netlify and Create a New Site:**

   Connect your Git repository.

2. **Set Environment Variables:**

   In Netlify dashboard, navigate to **Site Settings > Build & Deploy > Environment** and add:

   ```env
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

3. **Deploy the Site:**

   Netlify will automatically build and deploy your frontend.

### Testing the Integration

Testing ensures that your integration works as expected. We have included integration tests in `integration_tests.py`.

1. **Ensure Backend is Running:**

   Start your backend server locally or ensure it's accessible remotely.

2. **Run Integration Tests:**

   ```bash
   python integration_tests.py
   ```

   *Note: Ensure that the tests are configured to point to the correct backend URL.*

3. **Review Test Results:**

   The tests will output pass/fail statuses. Address any failures accordingly.

---

## Troubleshooting Guide

Encountering issues? Below are common problems and their solutions.

### Common Issues

1. **Backend Server Not Starting**

   - **Error:** `ImportError` related to missing modules.
   - **Solution:** Ensure all dependencies are installed using `pip install -r requirements.txt`.

2. **CORS Errors When Accessing Backend**

   - **Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`.
   - **Solution:** Verify that `flask_cors.CORS` is correctly configured in `app.py`.

3. **Authentication Failures with Duffel API**

   - **Error:** Unauthorized (`401`) responses from Duffel.
   - **Solution:** Check that `DUFFEL_API_KEY` is correctly set in your `.env` file and is valid.

4. **Network Issues When Connecting to Duffel API**

   - **Error:** Timeout or connection errors.
   - **Solution:** Ensure your server has internet access and Duffel API is operational [Duffel Status](https://status.duffel.com).

5. **Frontend Not Communicating with Backend**

   - **Error:** Network errors or no response.
   - **Solution:** Verify that the frontend's `REACT_APP_BACKEND_URL` is correctly pointing to the backend server. Check for any network restrictions or firewalls.

6. **Test Failures**

   - **Error:** Tests failing in `integration_tests.py`.
   - **Solution:** Review test logs for specific errors. Ensure the backend server is running and accessible to the test suite. Validate that environment variables are correctly set for testing.

### Logging and Debugging

- **Backend Logs:** Check the terminal where the backend server is running for real-time logs and error messages.
- **Frontend Console:** Use browser developer tools to inspect console logs and network requests.
- **Duffel API Logs:** Access your Duffel dashboard to review API request logs for debugging.

---

## Support Contact Information

If you encounter issues not covered in the troubleshooting guide, please reach out to our support team:

- **Email:** support@yourcompany.com
- **Slack:** [Join our Slack workspace](https://yourcompany.slack.com)
- **Phone:** +1 (123) 456-7890
- **Support Portal:** [https://yourcompany.com/support](https://yourcompany.com/support)

---

## Additional Resources

- **Duffel API Documentation:** [https://developer.duffel.com/docs](https://developer.duffel.com/docs)
- **Flask Documentation:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
- **Requests Library:** [https://docs.python-requests.org/](https://docs.python-requests.org/)
- **Flask-CORS:** [https://flask-cors.readthedocs.io/](https://flask-cors.readthedocs.io/)
- **dotenv Package:** [https://pypi.org/project/python-dotenv/](https://pypi.org/project/python-dotenv/)
- **Testing Guide:** Refer to `integration_tests.py` for test implementations and guidelines.

---

*© 2023 Your Company Name. All rights reserved.*