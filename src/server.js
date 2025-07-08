require('dotenv').config();
const express = require('express');
const http = require('http');
const {router} = require('./app/routes/api');
const sequelize = require('./config/databases');
const app = express();

app.use(express.json({ limit: '10000kb', extended: true }));

app.use("/api",router);

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    server.listen(PORT, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });