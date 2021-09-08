const Joi = require('joi');

const { CONSTANTS: { PASSWORD_REGEXP, EMAIL_REGEXP }, userRolesEnum } = require('../config');

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

const updateForgotValidator = Joi.object({
  password: Joi.string()
    .regex(PASSWORD_REGEXP)
    .required()
});

module.exports = {
  queryUserValidator,
  createUserValidator,
  updateUserValidator,
  paramsUserValidator,
  updateForgotValidator
};
