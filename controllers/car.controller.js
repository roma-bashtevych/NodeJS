const carService = require('../services/car.services');
const { MESSAGES: { DELETED_MESSAGE, UPDATE_MESSAGE }, statusCode } = require('../config');

module.exports = {
  getSingleCar: (req, res, next) => {
    try {
      const { car } = req;
      res.json(car);
    } catch (e) {
      next(e);
    }
  },

  getAllCar: async (req, res, next) => {
    try {
      const cars = await carService.findCars(req.query);
      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createdCar = await carService.createCar(req.body);

      res.status(statusCode.OK).json(createdCar);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      await carService.deleteCar({ _id: car_id });

      res.status(statusCode.DELETED).json(DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },
  updateCar: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      await carService.updateCarById({ _id: car_id }, req.body);

      res.status(statusCode.UPDATE_AND_CREATE).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  },
};
