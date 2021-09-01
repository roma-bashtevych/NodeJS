const router = require('express').Router();
const { ADMIN } = require('../config/user.roles.enum');
const { USER_ID, PARAMS, DB_FIELD } = require('../config/constants');

const { userController } = require('../controllers');
const {
  userMiddlewar: {
    validateUserQuery,
    validateCreateUserBody,
    validateUpdateUserBody,
    validateUserParams,
    isUserPresent,
    checkUniqueEmail,
    checkUserRole,
    getUserByDynamicParam
  }
} = require('../middlewars');

router.get('/', validateUserQuery, userController.getAllUsers);
router.post('/', validateCreateUserBody, checkUniqueEmail, userController.createUser);
router.get('/:user_id', validateUserParams, getUserByDynamicParam(USER_ID, PARAMS, DB_FIELD), userController.getSingleUser);
router.delete('/:user_id', validateUserParams, isUserPresent, checkUserRole([ADMIN]), userController.deleteUser);
router.patch('/:user_id', validateUserParams, validateUpdateUserBody, isUserPresent, userController.updateUser);

module.exports = router;
