const router = require('express').Router();

const {
  userRolesEnum,
  CONSTANTS: {
    USER_ID, PARAMS, DB_FIELD, EMAIL
  }
} = require('../config');

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
    checkUser
  },
  authMiddlewar: { validateAccessToken }
} = require('../middlewars');

router.get('/', validateUserQuery, userController.getAllUsers);
router.post('/', validateCreateUserBody, getUserByDynamicParam(EMAIL), isUserPresent, userController.createUser);
router.get('/:user_id', validateUserParams, getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD), userController.getSingleUser);
router.delete('/:user_id',
  validateAccessToken,
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  isUserNotPresent,
  checkUserRole([userRolesEnum.ADMIN]),
  userController.deleteUser);
router.patch('/:user_id',
  validateAccessToken,
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  isUserNotPresent,
  checkUser,
  userController.updateUser);

module.exports = router;
