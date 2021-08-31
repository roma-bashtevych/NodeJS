const ErrorHandler = require('../errors/ErrorHandler');
const carService = require('../services/car.services');
const { NOT_FOUND, WRONG, INVALID_OPTION } = require('../config/message');
const statusCode = require('../config/status');
const { carValidator } = require('../validators');
const Car = require('../database/Car');

module.exports = {
  isCarPresent: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      const car = await carService.getCarById(car_id);
      if (!car) {
        throw new ErrorHandler(statusCode.NOT_FOUND, NOT_FOUND);
      }

      req.car = car;
      next();
    } catch (e) {
      next(e);
    }
  },

  validateCreateCar: (req, res, next) => {
    try {
      const { error } = carValidator.createCar.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, error.details[0].message);
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
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, error.details[0].message);
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
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, WRONG);
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
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, NOT_FOUND);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  getCarByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
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
