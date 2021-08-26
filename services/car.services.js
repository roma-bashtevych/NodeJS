const Car = require('../database/Car');

module.exports = {
  findCars: () => Car.find({}),

  createCar: (carObject) => Car.create(carObject),

  deleteCar: (carId) => Car.deleteOne(carId),

  getCarById: (carId) => Car.findById(carId)
};
