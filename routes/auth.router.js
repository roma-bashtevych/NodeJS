const router = require('express').Router();

const { CONSTANTS: { EMAIL, BODY }, VAR: { ACTION_SECRET_KEY } } = require('../config');
const { authValidator, userValidator } = require('../validators');

const { authController } = require('../controllers');
const {
  authMiddlewar: {
    validateLoginationData,
    validateAccessToken,
    validateRefreshToken,
    validateActionToken
  }, userMiddlewar: {
    validateDataDynamic,
    isUserNotPresent,
    getUserByDynamicParam
  }
} = require('../middlewars');

router.post('/', validateLoginationData, getUserByDynamicParam(EMAIL), isUserNotPresent, authController.loginUser);

router.post('/logout', validateAccessToken, authController.logoutUser);

router.post('/refresh', validateRefreshToken, authController.refresh);

router.post('/forgot',
  validateDataDynamic(authValidator.authEmailValidator, BODY),
  getUserByDynamicParam(EMAIL),
  isUserNotPresent,
  authController.forgot);

router.patch('/forgot',
  validateDataDynamic(userValidator.updateForgotValidator),
  validateActionToken(ACTION_SECRET_KEY),
  authController.newPassword);

router.patch('/change',
  validateDataDynamic(authValidator.authChangePassValidator),
  validateAccessToken,
  authController.changePassword);

module.exports = router;
