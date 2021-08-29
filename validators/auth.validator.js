const Joi = require('joi');
const { PASSWORD_REGEXP } = require('../config/constants');

const createValidAuth = Joi.object({
  password: Joi.string()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required(),
  login: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),
});

module.exports = {
  createValidAuth
};
