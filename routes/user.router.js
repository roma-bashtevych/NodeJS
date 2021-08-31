const router = require('express').Router();

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
router.get('/:user_id', validateUserParams, getUserByDynamicParam('user_id', 'params', '_id'), userController.getSingleUser);
router.delete('/:user_id', validateUserParams, isUserPresent, checkUserRole(['admin']), userController.deleteUser);
router.patch('/:user_id', validateUserParams, validateUpdateUserBody, isUserPresent, userController.updateUser);

module.exports = router;
