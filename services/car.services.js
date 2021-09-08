const { Car } = require('../database');

module.exports = {
  findCars: (query) => Car.find(query),

  createCar: (carObject) => Car.create(carObject),

  deleteCar: (carId) => Car.deleteOne(carId),

  updateCarById: (carId, data) => Car.updateOne(carId, data)
};
