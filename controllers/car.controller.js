const carService = require('../services/car.services');
const { DELETED_MESSAGE, UPDATE_MESSAGE } = require('../config/message');

module.exports = {
  getSingleCar: (req, res, next) => {
    try {
      const { car } = req;
      res.json(car);
      next();
    } catch (e) {
      next(e);
    }
  },

  getAllCar: async (req, res, next) => {
    try {
      const cars = await carService.findCars({});
      res.json(cars);
    } catch (e) {
      next(e);
    }
  },

  createCar: async (req, res, next) => {
    try {
      const createdCar = await carService.createCar(req.body);

      res.json(createdCar);
    } catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { car_id } = req.params;
      await carService.deleteCar({ _id: car_id });

      res.status(204).json(DELETED_MESSAGE);
      next();
    } catch (e) {
      next(e);
    }
  },
  updateCar: async (req, res, next) => {
    try {
      const { car_id } = req.params;

      await carService.updateCarById({ _id: car_id }, req.body);

      res.status(201).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  },
};
