const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddlewar } = require('../middlewars');

router.get('/', userMiddlewar.validateUserQuery, userController.getAllUsers);
router.get('/:user_id', userMiddlewar.validateUserParams, userMiddlewar.isUserPresent, userController.getSingleUser);
router.post('/', userMiddlewar.validateCreateUserBody,
  userMiddlewar.isValidUserData,
  userMiddlewar.checkUniqueEmail,
  userController.createUser);
router.delete('/:user_id', userMiddlewar.validateUserParams, userMiddlewar.isUserPresent, userController.deleteUser);
router.patch('/:user_id', userMiddlewar.validateUserParams,
  userMiddlewar.validateUpdateUserBody,
  userMiddlewar.isUserPresent,
  userController.updateUser);

module.exports = router;
