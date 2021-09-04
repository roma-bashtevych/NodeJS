const { Schema, model } = require('mongoose');
const { DATABASE_TABLES: { USER, OAUTH } } = require('../config');

const OAuthSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, { timestamps: true });

module.exports = model(OAUTH, OAuthSchema);
