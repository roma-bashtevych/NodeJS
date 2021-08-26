const { Schema, model } = require('mongoose');

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

module.exports = model('car', carSchema);
