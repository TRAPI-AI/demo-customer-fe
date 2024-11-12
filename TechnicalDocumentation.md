```markdown
# Travel API Integration Documentation

## Table of Contents
- [General Overview](#general-overview)
- [Quick Start Guide](#quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Running the Backend Server](#running-the-backend-server)
    - [Locally](#locally)
    - [Remotely](#remotely)
  - [Running the Frontend Application](#running-the-frontend-application)
    - [Locally](#locally-1)
    - [Remotely](#remotely-1)
  - [Testing](#testing)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Support](#support)
- [Additional Resources](#additional-resources)

## General Overview

This integration connects your application with Duffel's flight offer API, allowing users to search and list flight offers seamlessly. The backend is built using Flask and serves as a proxy between your frontend application and the Duffel API. This setup ensures secure handling of API keys and provides a streamlined interface for fetching flight offers.

### Key Features
- **Secure API Key Management:** Utilizes environment variables to protect sensitive API keys.
- **CORS Enabled:** Allows cross-origin requests, facilitating frontend and backend interactions.
- **Error Handling:** Properly forwards responses and error messages from Duffel API to the client.

## Quick Start Guide

### Prerequisites

Before getting started, ensure you have the following installed:

- **Python 3.7+**
- **Node.js and npm** (if frontend is built with Node frameworks)
- **Git**
- **Docker** (optional, for containerized deployments)

### Running the Backend Server

The backend server is built with Flask and serves the `/duffel-flights-list-offers` endpoint.

#### Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/demo-customer-be.git
   cd demo-customer-be
   ```

2. **Create a Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your Duffel API key:

   ```env
   DUFFEL_API_KEY=your_duffel_api_key_here
   ```

5. **Run the Server**
   ```bash
   python app.py
   ```

   The backend server will start on `http://localhost:5000`.

#### Remotely

To deploy the backend server remotely, you can use platforms like **Heroku**, **AWS Elastic Beanstalk**, or **Docker**.

**Using Docker:**

1. **Create a `Dockerfile`**
   ```dockerfile
   FROM python:3.9-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   ENV DUFFEL_API_KEY=your_duffel_api_key_here

   CMD ["python", "app.py"]
   ```

2. **Build the Docker Image**
   ```bash
   docker build -t demo-customer-be .
   ```

3. **Run the Docker Container**
   ```bash
   docker run -d -p 5000:5000 --name demo-customer-be demo-customer-be
   ```

   The backend server will be accessible remotely at your server's IP address on port `5000`.

### Running the Frontend Application

> **Note:** Replace the placeholders with your actual frontend framework details.

#### Locally

1. **Navigate to Frontend Directory**
   ```bash
   cd demo-customer-fe
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file and set necessary variables, such as the backend API URL.

   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Start the Frontend Server**
   ```bash
   npm start
   ```

   The frontend will typically run on `http://localhost:3000`.

#### Remotely

Deploy the frontend using platforms like **Vercel**, **Netlify**, or **AWS Amplify**.

**Using Netlify:**

1. **Build the Frontend**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder into Netlify dashboard.
   - Set environment variables in Netlify settings, such as `REACT_APP_BACKEND_URL`.

### Testing

We have implemented integration tests in `integration_tests.py` to ensure the backend interacts correctly with the Duffel API.

1. **Ensure the Backend Server is Running**

2. **Run the Tests**
   ```bash
   python integration_tests.py
   ```

   The tests will validate endpoints and response handling.

## Troubleshooting Guide

### Common Issues

1. **CORS Errors**
   - **Symptom:** Frontend cannot communicate with the backend.
   - **Solution:** Ensure CORS is properly configured in the backend. The provided backend code uses `flask_cors.CORS(app)` which allows all origins by default. Adjust settings if necessary.

2. **Authentication Errors**
   - **Symptom:** Receiving `401 Unauthorized` from Duffel API.
   - **Solution:** Verify that the `DUFFEL_API_KEY` is correctly set in the `.env` file and matches your Duffel account credentials.

3. **Server Not Starting**
   - **Symptom:** Backend server fails to start or crashes.
   - **Solution:** Check for missing dependencies by ensuring all packages in `requirements.txt` are installed. Review logs for specific error messages.

4. **Network Issues**
   - **Symptom:** Unable to reach Duffel API.
   - **Solution:** Ensure that your server has internet access and that there are no firewall rules blocking outgoing requests to `https://api.duffel.com`.

### Debugging Steps

1. **Check Logs**
   - Review backend server logs for error messages.
   - Use browser developer tools to inspect frontend network requests.

2. **Validate Environment Variables**
   - Ensure all necessary environment variables are correctly set and loaded.

3. **Test Endpoints Manually**
   - Use tools like **Postman** or **cURL** to send requests to the backend endpoint and verify responses.

## Support

If you encounter issues or have questions about the integration, please reach out through the following channels:

- **Email:** support@yourcompany.com
- **Slack:** [Join our Slack workspace](https://yourcompany.slack.com)
- **GitHub Issues:** [Open an issue](https://github.com/your-repo/demo-customer-be/issues)

## Additional Resources

- **Duffel API Documentation:**  
  [https://duffel.com/docs/api](https://duffel.com/docs/api)

- **Flask Documentation:**  
  [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)

- **Flask-CORS Documentation:**  
  [https://flask-cors.readthedocs.io/](https://flask-cors.readthedocs.io/)

- **Requests Library Documentation:**  
  [https://docs.python-requests.org/](https://docs.python-requests.org/)

- **Docker Documentation:**  
  [https://docs.docker.com/](https://docs.docker.com/)
```