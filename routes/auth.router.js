const router = require('express').Router();

const { CONSTANTS: { EMAIL } } = require('../config');
const { authValidator } = require('../validators');

const { authController } = require('../controllers');
const {
  authMiddlewar: {
    validateLoginationData,
    validateAccessToken,
    validateRefreshToken,
    validateForgotToken
  }, userMiddlewar: {
    validateDataDynamic,
    isUserNotPresent,
    getUserByDynamicParam,
    validForgotPass
  }
} = require('../middlewars');

router.post('/', validateLoginationData, getUserByDynamicParam(EMAIL), isUserNotPresent, authController.loginUser);
router.post('/logout', validateAccessToken, authController.logoutUser);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/forgot', getUserByDynamicParam(EMAIL), isUserNotPresent, authController.forgot);
router.patch('/forgot', validateDataDynamic(authValidator.authValidator),
  validateForgotToken,
  validForgotPass,
  authController.newPassword);
router.patch('/change', validateDataDynamic(authValidator.authChangePassValidator),
  validateAccessToken,
  authController.changePassword);

module.exports = router;
