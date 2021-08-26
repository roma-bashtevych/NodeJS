const { Schema, model } = require('mongoose');

const userRolesEnum = require('../config/user.roles.enum');

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: userRolesEnum.USER,
    enum: Object.values(userRolesEnum)
  }
}, { timestamps: true });

module.exports = model(userRolesEnum.USER, userSchema);
