const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const silverrailRoutes = require('./routes/silverrail');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
