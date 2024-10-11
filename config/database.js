const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {

    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        
      },
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

module.exports = new Database();