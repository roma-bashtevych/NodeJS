const { Schema, model } = require('mongoose');

const { userRolesEnum } = require('../config');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
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
  },
  activat: {
    type: Boolean,
    required: true,
    default: false
  },
  avatar: {
    type: String
  }
}, { timestamps: true });

module.exports = model(userRolesEnum.USER, userSchema);
