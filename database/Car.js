const { Schema, model } = require('mongoose');

const { DATABASE_TABLES: { CAR } } = require('../config');

const carSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  price: {
    type: Number,
    default: 5000
  }
});

module.exports = model(CAR, carSchema);
