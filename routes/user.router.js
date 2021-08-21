const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getSingleUser);
router.post('/', userController.createUser);

module.exports = router;
