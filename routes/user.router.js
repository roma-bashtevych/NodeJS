const router = require('express').Router();
const { ADMIN } = require('../config/user.roles.enum');
const { USER_ID, PARAMS, DB_FIELD } = require('../config/constants');

const { userController } = require('../controllers');
const {
  userMiddlewar: {
    validateUserQuery,
    validateCreateUserBody,
    validateUserParams,
    isUserPresent,
    isUserNotPresent,
    getUserByDynamicParam,
    checkUserRole,
  },
  authMiddlewar: { validateAccessToken }
} = require('../middlewars');

router.get('/', validateUserQuery, userController.getAllUsers);
router.post('/', validateCreateUserBody, getUserByDynamicParam('email'), isUserPresent, userController.createUser);
router.get('/:user_id', validateUserParams, getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD), userController.getSingleUser);
router.delete('/:user_id',
  validateAccessToken,
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  isUserNotPresent,
  checkUserRole([ADMIN]),
  userController.deleteUser);
router.patch('/:user_id',
  validateAccessToken,
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  isUserNotPresent,
  checkUserRole([' ']),
  userController.updateUser);

module.exports = router;
