const Joi = require('joi');

const { CONSTANTS: { CURRENT_YEAR } } = require('../config');

const createCar = Joi.object({
  model: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .required(),
  year: Joi.number()
    .max(CURRENT_YEAR),
  price: Joi.number()
    .min(1000)
});

const paramsCarValidator = Joi.object({
  car_id: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
});

const queryCarValidator = Joi.object({
  model: Joi.string()
    .alphanum()
    .min(2)
    .max(50)
    .trim(),
  year: Joi.number()
    .max(CURRENT_YEAR),
  price: Joi.number()
    .min(1000)
});

const updateCar = Joi.object({
  model: Joi.string()
    .min(2)
    .max(50),
  year: Joi.number()
    .max(CURRENT_YEAR),
  price: Joi.number()
    .min(1000)
});

module.exports = {
  createCar,
  updateCar,
  paramsCarValidator,
  queryCarValidator
};
