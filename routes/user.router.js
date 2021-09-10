const router = require('express')
  .Router();

const {
  userRolesEnum,
  VAR: { ACTION_SECRET_KEY, ADMIN_SECRET_KEY },
  CONSTANTS: {
    USER_ID,
    PARAMS,
    DB_FIELD,
    EMAIL,
    BODY,
    QUERY
  }
} = require('../config');
const { userValidator } = require('../validators');

const { userController } = require('../controllers');
const {
  userMiddlewar: {
    validateDataDynamic,
    isUserPresent,
    isUserNotPresent,
    getUserByDynamicParam,
    checkUserRole,
    checkAdminRole,
    checkUser
  },
  authMiddlewar: {
    validateAccessToken,
    validateActionToken
  }
} = require('../middlewars');

router.get('/', validateDataDynamic(userValidator.queryUserValidator, QUERY), userController.getAllUsers);

router.post('/', validateDataDynamic(userValidator.createUserValidator, BODY),
  getUserByDynamicParam(EMAIL),
  isUserPresent,
  userController.createUser);

router.post('/admin',
  validateAccessToken,
  checkAdminRole,
  validateDataDynamic(userValidator.createUserValidator, BODY),
  getUserByDynamicParam(EMAIL),
  userController.createNewAdmin);

router.patch('/admin',
  validateDataDynamic(userValidator.updateForgotValidator, BODY),
  validateActionToken(ADMIN_SECRET_KEY),
  userController.changePasswordAdmin);

router.get('/:user_id', validateDataDynamic(userValidator.paramsUserValidator, PARAMS),
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  userController.getSingleUser);

router.delete('/:user_id',
  validateDataDynamic(userValidator.paramsUserValidator, PARAMS),
  validateAccessToken,
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  isUserNotPresent,
  checkUserRole([userRolesEnum.ADMIN]),
  userController.deleteUser);

router.patch('/:user_id',
  validateDataDynamic(userValidator.updateUserValidator, BODY),
  validateDataDynamic(userValidator.paramsUserValidator, PARAMS),
  validateAccessToken,
  getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD),
  isUserNotPresent,
  checkUser,
  userController.updateUser);

router.post('/activate', validateActionToken(ACTION_SECRET_KEY), userController.activateUser);

module.exports = router;
