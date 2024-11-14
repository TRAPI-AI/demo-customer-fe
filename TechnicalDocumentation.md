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
  - [Testing](#testing)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Support](#support)
- [API Provider Documentation](#api-provider-documentation)

---

## General Overview

This integration enables your application to fetch and display flight offers using Duffel's Flight Offers API. The backend, built with Flask, handles API requests, communicates with Duffel, and serves responses to the frontend. The frontend component interacts with this backend to present flight options to users seamlessly.

### Key Features

- **Backend Integration:** Communicates with Duffel's API to retrieve flight offers.
- **Frontend Interface:** Presents flight options to users with a user-friendly interface.
- **Secure Authentication:** Utilizes environment variables to manage API keys securely.
- **CORS Enabled:** Supports cross-origin requests to facilitate frontend-backend communication.
- **Automated Testing:** Ensures reliability with integration tests.

---

## Quick Start Guide

### Prerequisites

Before getting started, ensure you have the following installed:

- **Backend:**
  - [Python 3.7+](https://www.python.org/downloads/)
  - [pip](https://pip.pypa.io/en/stable/installation/)
- **Frontend:**
  - [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- **Other:**
  - [Git](https://git-scm.com/downloads)
  - [DuFFEL API Key](https://duffel.com/developers)

### Running the Backend Server

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/demo-customer-be.git
cd demo-customer-be
```

#### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add your Duffel API key:

```env
DUFFEL_API_KEY=your_duffel_api_key_here
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Running the Backend Locally

Start the Flask server:

```bash
python app.py
```

The backend server will be accessible at `http://localhost:5000`.

#### 5. Deploying the Backend Remotely

To deploy the backend remotely, you can use platforms like **Heroku**, **AWS Elastic Beanstalk**, or **Google App Engine**. Below is an example using Heroku:

**Using Heroku:**

1. **Install Heroku CLI:** [Heroku CLI Installation](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login to Heroku:**

   ```bash
   heroku login
   ```

3. **Create a New Heroku App:**

   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables on Heroku:**

   ```bash
   heroku config:set DUFFEL_API_KEY=your_duffel_api_key_here
   ```

5. **Deploy to Heroku:**

   ```bash
   git push heroku main
   ```

6. **Scale the App:**

   ```bash
   heroku ps:scale web=1
   ```

Your backend is now deployed and accessible via `https://your-app-name.herokuapp.com`.

### Running the Frontend

**Note:** Ensure you have access to the frontend repository or codebase. The instructions below assume a standard React frontend setup.

#### 1. Clone the Frontend Repository

```bash
git clone https://github.com/yourusername/demo-customer-fe.git
cd demo-customer-fe
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory and set the backend API URL:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

For remote deployments, replace `http://localhost:5000` with your remote backend URL.

#### 4. Running the Frontend Locally

Start the frontend development server:

```bash
npm start
```

The frontend application will be accessible at `http://localhost:3000`.

#### 5. Deploying the Frontend Remotely

You can deploy the frontend using platforms like **Netlify**, **Vercel**, or **GitHub Pages**. Here's an example using Netlify:

**Using Netlify:**

1. **Build the Frontend:**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**

   - Log in to [Netlify](https://www.netlify.com/).
   - Create a new site by dragging and dropping the `build` folder or by connecting your Git repository.

3. **Set Environment Variables on Netlify:**

   - Navigate to your site's settings.
   - Add `REACT_APP_BACKEND_URL` with your remote backend URL.

Your frontend is now deployed and accessible via Netlify's provided URL.

### Testing

Automated tests are available in the `integration_tests.py` file.

#### Running Tests Locally

1. **Ensure Dependencies are Installed:**

   ```bash
   pip install -r requirements.txt
   pip install pytest
   ```

2. **Run Tests:**

   ```bash
   pytest integration_tests.py
   ```

#### Testing Options

- **Automated Testing:** Utilize `pytest` for running integration tests.
- **Manual Testing:** Use tools like **Postman** or **cURL** to send requests to the backend endpoints.
- **Frontend Testing:** Implement frontend tests using frameworks like **Jest** or **React Testing Library**.

---

## Troubleshooting Guide

### Common Issues & Solutions

1. **Backend Server Fails to Start**

   - **Error:** `ModuleNotFoundError: No module named 'flask'`
   - **Solution:** Ensure all dependencies are installed by running `pip install -r requirements.txt`.

2. **CORS Errors When Accessing Backend from Frontend**

   - **Error Message:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy.`
   - **Solution:** Ensure CORS is properly configured in the backend. The provided Flask setup includes `CORS(app)`. If issues persist, specify allowed origins:

     ```python
     CORS(app, origins=["http://localhost:3000", "https://your-frontend-domain.com"])
     ```

3. **Authentication Errors with Duffel API**

   - **Error:** `401 Unauthorized` or similar.
   - **Solution:** Verify that `DUFFEL_API_KEY` is correctly set in the `.env` file and that it's active. Regenerate the API key from the Duffel dashboard if necessary.

4. **Network Issues When Backend Communicates with Duffel**

   - **Symptoms:** Timeout errors or no response from Duffel API.
   - **Solution:** Check your server's internet connectivity. Verify Duffel's API status [here](https://duffel.com/status).

5. **Frontend Not Displaying Flight Offers**

   - **Checkpoints:**
     - Ensure the backend is running and accessible.
     - Verify that `REACT_APP_BACKEND_URL` is correctly set.
     - Inspect browser console for errors.
     - Confirm that API responses have the expected data structure.

6. **Tests Failing**

   - **Error:** Various errors in `integration_tests.py`.
   - **Solution:** Ensure that the backend server is running before executing tests. Verify that environment variables are correctly set during testing.

### Debugging Steps

1. **Check Server Logs:**

   - Review the backend logs for error messages.
   - If deployed remotely, use the platform's logging tools (e.g., Heroku logs).

2. **Use API Testing Tools:**

   - **Postman:** Send requests to `http://localhost:5000/duffel-flights-list-offers` with appropriate JSON payloads.
   - **cURL:** Test endpoints via the command line.

   Example cURL command:

   ```bash
   curl -X POST http://localhost:5000/duffel-flights-list-offers \
   -H "Content-Type: application/json" \
   -d '{"origin": "LHR", "destination": "JFK", "departure_date": "2023-12-25"}'
   ```

3. **Verify Environment Variables:**

   - Ensure that the `.env` file is correctly formatted.
   - Confirm that environment variables are loaded by printing them within the application (for debugging purposes only).

4. **Check API Documentation:**

   - Refer to [Duffel's API Docs](https://duffel.com/developers) to ensure that API requests adhere to the latest specifications.

---

## Support

If you encounter issues not covered in this documentation, please reach out to our support team:

- **Email:** support@yourcompany.com
- **Phone:** +1 (234) 567-8901
- **Support Portal:** [https://yourcompany.com/support](https://yourcompany.com/support)

---

## API Provider Documentation

For more detailed information on the Duffel API, refer to the official documentation:

- **Duffel API Documentation:** [https://duffel.com/developers](https://duffel.com/developers)
  - **Authentication:** [Authentication Guide](https://duffel.com/developers/docs/authentication)
  - **Flight Offers:** [Flight Offers API](https://duffel.com/developers/docs/flight-offers)
  - **Error Handling:** [Error Responses](https://duffel.com/developers/docs/errors)

---

# Demo Backend Code

Below is the implemented backend code that integrates with Duffel's Flight Offers API:

```python
# demo-customer-be
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
import json
import os
from dotenv import load_dotenv
import hashlib
import time

# Initializing Flask app
app = Flask(__name__)
CORS(app)

load_dotenv()

# New endpoint to list Duffel flight offers
@app.route('/duffel-flights-list-offers', methods=['POST'])
def duffel_flights_list_offers():
    try:
        # Extracting request data
        request_data = request.get_json()
        
        # Duffel API endpoint
        url = 'https://api.duffel.com/air/offer_requests'
        
        # Headers for Duffel API
        headers = {
            "Accept-Encoding": "gzip",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Duffel-Version": "v2",
            "Authorization": f"Bearer {os.getenv('DUFFEL_API_KEY')}"
        }
        
        # Making a POST request to Duffel API
        response = requests.post(url, headers=headers, json=request_data)
        
        # Returning the response from Duffel API
        return Response(response.content, status=response.status_code, content_type=response.headers['Content-Type'])
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Running the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
```

**Highlights:**

- **Flask Application:** Sets up a Flask server with CORS enabled.
- **Environment Variables:** Uses `python-dotenv` to manage sensitive data like the Duffel API key.
- **API Endpoint:** Defines `/duffel-flights-list-offers` to handle POST requests for fetching flight offers.
- **Error Handling:** Catches exceptions and returns a JSON error message with a 500 status code.
- **Running the Server:** Configured to run on port `5000` in debug mode.

---

# Additional Resources

- **Flask Documentation:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
- **Flask-CORS Documentation:** [https://flask-cors.readthedocs.io/](https://flask-cors.readthedocs.io/)
- **Requests Library:** [https://requests.readthedocs.io/](https://requests.readthedocs.io/)
- **Dotenv Documentation:** [https://saurabh-kumar.com/python-dotenv/](https://saurabh-kumar.com/python-dotenv/)
- **Pytest Documentation:** [https://docs.pytest.org/](https://docs.pytest.org/)

---

Feel free to customize this documentation to better fit your project's specifics and team needs.