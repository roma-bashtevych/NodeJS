const router = require('express').Router();

const { CONSTANTS: { CAR_ID, PARAMS, DB_FIELD } } = require('../config');

const { carController } = require('../controllers');
const {
  carMiddlewar: {
    validateCarQuery,
    validateCarParams,
    validateUpdateCar,
    validateCreateCar,
    getCarByDynamicParam
  }
} = require('../middlewars');

router.get('/', validateCarQuery, carController.getAllCar);

router.post('/', validateCreateCar, carController.createCar);

router.get('/:car_id', validateCarParams, getCarByDynamicParam(CAR_ID, PARAMS, DB_FIELD), carController.getSingleCar);

router.delete('/:car_id', validateCarParams, getCarByDynamicParam(CAR_ID, PARAMS, DB_FIELD), carController.deleteCar);

router.patch('/:car_id', validateCarParams,
  validateUpdateCar,
  getCarByDynamicParam(CAR_ID, PARAMS, DB_FIELD),
  carController.updateCar);

module.exports = router;
