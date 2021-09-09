const { Schema, model } = require('mongoose');

const { DATABASE_TABLES: { USER, ACTION_TOKEN } } = require('../config');

const ActionTokenSchema = new Schema({
  action_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER
  }
}, { timestamps: true });

module.exports = model(ACTION_TOKEN, ActionTokenSchema);
