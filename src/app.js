const express = require('express');
const router = require('./app/routes/api');
const errorResponse = require('./utils/errorResponse');
const app = express();

app.use(express.json({ limit: '10000kb', extended: true }));

app.use("/api",router);

// i want to check if the route is invalid
app.use(errorResponse.invalidEndPoint);

app.use((error, req, res, next) => {
  return res.status(250).json(errorResponse.makeErrorResponse(req, res, error));
});

module.exports = app;