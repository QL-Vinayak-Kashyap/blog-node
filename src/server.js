require('dotenv').config();
const http = require('http');
const sequelize = require('./config/databases');
const app = require('./app');

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => {
    server.listen(PORT, () => {
      console.clear()
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });