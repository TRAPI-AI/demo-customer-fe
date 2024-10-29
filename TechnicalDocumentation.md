# Duffel API Integration Documentation

Welcome to the Duffel API Integration Documentation. This guide provides a comprehensive overview of the integration between the backend (Flask) and frontend (React) components to fetch and display flight offers using the Duffel API.

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

This integration comprises a **Flask** backend server and a **React** frontend application that interact with the **Duffel API** to fetch and display flight offers based on user input. The backend handles API requests to Duffel, processes the responses, and serves them to the frontend, which presents the data to the end-users.

### Architecture Diagram

```plaintext
[Frontend (React)] <--> [Backend (Flask)] <--> [Duffel API]
```

## Quick Start Guide

### Prerequisites

Before getting started, ensure you have the following installed on your system:

- **Python 3.7+**
- **Node.js 14+** and **npm** or **yarn**
- **Git** (optional, for cloning the repository)
- **Duffel API Key**

### Running the Backend Server

The backend is built with Flask and handles communication with the Duffel API.

#### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/duffel-integration.git
cd duffel-integration/backend
```

#### 2. Install Dependencies

It's recommended to use a virtual environment.

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

*If `requirements.txt` is not provided, install the necessary packages:*

```bash
pip install Flask flask-cors requests python-dotenv
```

#### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory and add your Duffel API key:

```env
DUFFEL_API_KEY=your_duffel_api_key_here
```

#### 4. Run the Backend Server Locally

```bash
python app.py
```

The server will start on `http://localhost:5000`.

#### 5. Deploying the Backend Remotely

To deploy the Flask backend to a remote server, follow these general steps:

1. **Choose a Hosting Provider**: AWS, Heroku, DigitalOcean, etc.
2. **Set Up the Server Environment**:
   - Install Python and necessary dependencies.
   - Transfer your backend code to the server.
3. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Environment Variables**:

   Ensure that `DUFFEL_API_KEY` is set in the server's environment.

5. **Use a Production WSGI Server**:

   Deploy using Gunicorn or another WSGI server.

   ```bash
   gunicorn app:app
   ```

6. **Configure a Reverse Proxy**:

   Set up Nginx or another web server to proxy requests to Gunicorn.

7. **Ensure Security and Scalability**:

   Configure SSL, manage scaling, etc.

*Refer to your hosting provider's documentation for specific deployment instructions.*

### Running the Frontend Application

The frontend is built with React and interacts with the Flask backend to display flight offers.

#### 1. Navigate to the Frontend Directory

```bash
cd ../frontend
```

#### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

#### 3. Configure Environment Variables

If necessary, create a `.env` file to set any required environment variables. For local development, ensure the frontend points to the backend server's URL (`http://localhost:5000`).

#### 4. Run the Frontend Locally

```bash
npm start
```

Or with yarn:

```bash
yarn start
```

The application will typically run on `http://localhost:3000`.

#### 5. Deploying the Frontend Remotely

To deploy the React frontend to a remote server or hosting service:

1. **Build the Application**:

   ```bash
   npm run build
   ```

   Or with yarn:

   ```bash
   yarn build
   ```

2. **Choose a Hosting Provider**: Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront, etc.
3. **Upload the Build Files**:

   Follow the hosting provider's instructions to deploy the `build` directory.
4. **Configure Environment Variables**:

   Ensure the frontend points to the correct backend URL in the production environment.

*Refer to your hosting provider's documentation for specific deployment instructions.*

## Testing

We have implemented integration tests to ensure the backend and frontend interact correctly with the Duffel API.

### Running Integration Tests

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

2. **Ensure Dependencies are Installed**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Tests**

   ```bash
   python integration_tests.py
   ```

*Ensure that the backend server is running before executing the tests.*

### Test Coverage

The `integration_tests.py` file includes tests for:

- Validating successful API requests to Duffel.
- Handling error responses from Duffel.
- Ensuring correct data processing and response formatting.

## Troubleshooting Guide

### Common Issues

1. **Backend Server Errors**

   - **Missing DUFFEL_API_KEY**:
     - **Symptom**: `Authorization` errors or failed requests to Duffel.
     - **Solution**: Ensure that the `.env` file contains a valid `DUFFEL_API_KEY` and that the backend server has loaded the environment variables correctly.

   - **Network Issues**:
     - **Symptom**: Timeouts or connectivity errors when communicating with Duffel.
     - **Solution**: Check your internet connection and ensure that the Duffel API is reachable from your server.

2. **Frontend Application Errors**

   - **CORS Errors**:
     - **Symptom**: Browser console logs showing CORS-related issues.
     - **Solution**: Ensure that the Flask backend has CORS enabled for the frontend's origin.

   - **Fetch Failures**:
     - **Symptom**: Unable to retrieve offers, errors in network requests.
     - **Solution**: Verify that the backend server is running and accessible from the frontend. Check the API endpoint URL and network connectivity.

3. **Deployment Issues**

   - **Incorrect Environment Variables**:
     - **Symptom**: Authentication failures or missing configurations.
     - **Solution**: Double-check that all necessary environment variables are set correctly in the deployment environment.

   - **Server Startup Failures**:
     - **Symptom**: Backend or frontend server fails to start.
     - **Solution**: Review server logs for error messages and ensure all dependencies are installed.

### Debugging Tips

- **Check Logs**:
  - **Backend**: Inspect the terminal where the Flask server is running for error messages.
  - **Frontend**: Use browser developer tools to view console logs and network requests.

- **Validate API Requests**:
  - Use tools like Postman to manually send requests to the backend and verify responses.

- **Verify Environment Variables**:
  - Ensure all necessary variables are correctly set and loaded in both backend and frontend environments.

## Support

If you encounter issues or need assistance, please reach out through the following channels:

- **Email**: support@yourdomain.com
- **GitHub Issues**: [GitHub Repository Issues](https://github.com/your-repo/duffel-integration/issues)
- **Slack**: Join our support Slack channel at [Slack Invite Link](https://your-slack-invite-link.com)

*Please provide detailed information about your issue, including error messages and steps to reproduce.*

## Additional Resources

- **Duffel API Documentation**: [https://duffel.com/docs/api](https://duffel.com/docs/api)
- **Flask Documentation**: [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
- **React Documentation**: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- **Flask-CORS Documentation**: [https://flask-cors.readthedocs.io/](https://flask-cors.readthedocs.io/)
- **Python Requests Library**: [https://requests.readthedocs.io/](https://requests.readthedocs.io/)
- **Gunicorn Documentation**: [https://docs.gunicorn.org/](https://docs.gunicorn.org/)
- **Deployment Guides**:
  - **Heroku Flask Deployment**: [https://devcenter.heroku.com/articles/deploying-python](https://devcenter.heroku.com/articles/deploying-python)
  - **Netlify React Deployment**: [https://docs.netlify.com/site-deploys/create-deploys/](https://docs.netlify.com/site-deploys/create-deploys/)
  
For more information and advanced configurations, refer to the respective documentation links above.

---

*Thank you for using our Duffel API Integration! We hope this documentation helps you set up and utilize the integration effectively.*