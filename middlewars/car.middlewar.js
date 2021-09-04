const { ErrorHandler } = require('../errors');
const { carValidator } = require('../validators');
const { Car } = require('../database');
const { MESSAGES: { NOT_FOUND, WRONG, INVALID_OPTION }, CONSTANTS: { BODY }, statusCode } = require('../config');

module.exports = {
  validateCreateCar: (req, res, next) => {
    try {
      const { error } = carValidator.createCar.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validateUpdateCar: (req, res, next) => {
    try {
      const { error } = carValidator.updateCar.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateCarParams: (req, res, next) => {
    try {
      const { error } = carValidator.paramsCarValidator.validate(req.params);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validateCarQuery: (req, res, next) => {
    try {
      const { error } = carValidator.queryCarValidator.validate(req.query);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, NOT_FOUND);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  getCarByDynamicParam: (paramName, searchIn = BODY, dbFiled = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const car = await Car.findOne({ [dbFiled]: value });

      if (!car) {
        throw new ErrorHandler(statusCode.NOT_FOUND, INVALID_OPTION);
      }

      req.car = car;

      next();
    } catch (e) {
      next(e);
    }
  }

};
