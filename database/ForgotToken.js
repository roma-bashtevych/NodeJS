const { Schema, model } = require('mongoose');

const { DATABASE_TABLES: { USER, FORGOT_TOKEN } } = require('../config');

const ForgotTokenSchema = new Schema({
  forgot_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, { timestamps: true });

module.exports = model(FORGOT_TOKEN, ForgotTokenSchema);
