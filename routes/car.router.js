const router = require('express').Router();

const { carController } = require('../controllers');
const {
  carMiddlewar: {
validateCarQuery,
    validateCarParams,
    validateUpdateCar,
    validateCreateCar,
    isCarPresent,
    getCarByDynamicParam
  }
} = require('../middlewars');

router.get('/', validateCarQuery, carController.getAllCar);
router.post('/', validateCreateCar, carController.createCar);
router.get('/:car_id', validateCarParams, getCarByDynamicParam('car_id', 'params', '_id'), carController.getSingleCar);
router.delete('/:car_id', validateCarParams, isCarPresent, carController.deleteCar);
router.patch('/:car_id', validateCarParams,
  validateUpdateCar,
  isCarPresent,
  carController.updateCar);

module.exports = router;
