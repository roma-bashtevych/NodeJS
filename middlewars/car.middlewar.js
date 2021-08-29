const ErrorHandler = require('../errors/ErrorHandler');
const carService = require('../services/car.services');
const { NOT_FOUND, WRONG } = require('../config/message');
const carValidator = require('../validators/car.validator');

module.exports = {
  isCarPresent: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      const car = await carService.getCarById(car_id);
      if (!car) {
        throw new ErrorHandler(418, NOT_FOUND);
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
        throw new ErrorHandler(400, error.details[0].message);
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
        throw new ErrorHandler(400, error.details[0].message);
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
        throw new ErrorHandler(400, WRONG);
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
        throw new ErrorHandler(400, NOT_FOUND);
      }
      next();
    } catch (e) {
      next(e);
    }
  },
};
