const ErrorHandler = require('../errors/ErrorHandler');
const carService = require('../services/car.services');

module.exports = {
  isCarPresent: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      const car = await carService.getCarById(car_id);
      if (!car) {
        throw new ErrorHandler(418, 'car not found');
      }

      req.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }
};
