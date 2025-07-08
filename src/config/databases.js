const Sequilize = require('sequelize');

const sequelize = new Sequilize(
    process.env.DB_NAME || 'blog',
    process.env.DB_USER , process.env.DB_PASS,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect:process.env.DB_DIALECT || 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: console.log,
        dialectOptions: {
            timezone: 6000
        }
    });

module.exports = sequelize;