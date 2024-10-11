const Database = require('../config/database');
const { Sequelize } = require('sequelize');
const Product = require('./product.model');

const sequelize = Database.sequelize;

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  Product: Product.init(sequelize, Sequelize),
};
Product.associate(db);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = db;
 