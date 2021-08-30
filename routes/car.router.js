const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddlewar } = require('../middlewars');

router.get('/', carMiddlewar.validateCarQuery, carController.getAllCar);
router.post('/', carMiddlewar.validateCreateCar, carController.createCar);
router.get('/:car_id', carMiddlewar.validateCarParams, carMiddlewar.isCarPresent, carController.getSingleCar);
router.delete('/:car_id', carMiddlewar.validateCarParams, carMiddlewar.isCarPresent, carController.deleteCar);
router.patch('/:car_id', carMiddlewar.validateCarParams,
  carMiddlewar.validateUpdateCar,
  carMiddlewar.isCarPresent,
  carController.updateCar);

module.exports = router;
