const router = require('express').Router();

const { carController } = require('../controllers');
const { isCarPresent } = require('../middlewars/car.middlewar');

router.get('/', carController.getAllCar);
router.get('/:car_id', isCarPresent, carController.getSingleCar);
router.post('/', carController.createCar);
router.delete('/:car_id', isCarPresent, carController.deleteCar);

module.exports = router;
