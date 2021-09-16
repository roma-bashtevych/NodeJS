const { Car } = require('../database');

module.exports = {
  createCar: (carObject) => Car.create(carObject),

  deleteCar: (carId) => Car.deleteOne(carId),

  updateCarById: (carId, data) => Car.updateOne(carId, data),

  getAllCars: async (query = {}) => {
    const {
      perPage = 10,
      page = 1,
      sortBy = 'createdAt',
      order = 'asc',
      ...filters
    } = query;

    const orderBy = order === 'asc' ? -1 : 1;

    const filterObject = {};
    const priceFilter = {};
    const yearFilter = {};

    Object.keys(filters).forEach((filterParam) => {
      switch (filterParam) {
        case 'price.lte': {
          Object.assign(priceFilter, { $lte: +filters['price.lte'] });
          break;
        }
        case 'price.gte': {
          Object.assign(priceFilter, { $gte: +filters['price.gte'] });
          break;
        }
        case 'year.lte': {
          Object.assign(yearFilter, { $lte: +filters['year.lte'] });
          break;
        }
        case 'year.gte': {
          Object.assign(yearFilter, { $gte: +filters['year.gte'] });
          break;
        }
        default: {
          filterObject[filterParam] = filters[filterParam];
        }
      }
    });

    if (Object.keys(priceFilter).length) {
      filterObject.price = priceFilter;
    }

    if (Object.keys(yearFilter).length) {
      filterObject.year = yearFilter;
    }

    const cars = await Car
      .find(filterObject)
      .sort({ [sortBy]: orderBy })
      .limit(+perPage)
      .skip((page - 1) * perPage);

    return cars;
  }
};
