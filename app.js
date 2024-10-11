const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const productRoutes = require('./routes/product.routes');
const Database = require('./config/database');
require('dotenv').config();
const db = require('./models');
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/products', productRoutes);



const PORT = process.env.PORT || 3000; 

Database.connect().then(async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
});