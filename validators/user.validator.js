const Joi = require('joi');
const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../config/constants');
const userRolesEnum = require('../config/user.roles.enum');

const queryUserValidator = Joi.object({
  name: Joi.string()
    .min(2)
    .max(10)
    .trim(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .trim(),
  role: Joi.string()
    .allow(...Object.values(userRolesEnum))
});

const createUserValidator = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),
  password: Joi.string()
    .alphanum()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .required(),
  role: Joi.string()
    .allow(...Object.values(userRolesEnum))
});

const updateUserValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .trim(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
});

const paramsUserValidator = Joi.object({
  user_id: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
});

module.exports = {
  queryUserValidator,
  createUserValidator,
  updateUserValidator,
  paramsUserValidator
};
