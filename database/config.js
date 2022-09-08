const mongoose = require('mongoose');

const { config } = require('../config');

const dbConnection = async () => {
  try {
    await mongoose.connect(config.mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database is connected');
  } catch (error) {
    throw new Error({ name: 'Error', message: error });
  }
};

module.exports = { dbConnection };
