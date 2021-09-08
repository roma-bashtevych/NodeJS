const router = require('express').Router();

const { CONSTANTS: { EMAIL } } = require('../config');

const { authController } = require('../controllers');
const {
  authMiddlewar: {
    validateLoginationData,
    validateAccessToken,
    validateRefreshToken,
    validateForgotToken
 }, userMiddlewar: {
    isUserNotPresent,
    getUserByDynamicParam,
    validForgotPass
  }
} = require('../middlewars');

router.post('/', validateLoginationData, getUserByDynamicParam(EMAIL), isUserNotPresent, authController.loginUser);
router.post('/logout', validateAccessToken, authController.logoutUser);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/forgot', getUserByDynamicParam(EMAIL), isUserNotPresent, authController.forgot);
router.patch('/forgot', validateForgotToken, validForgotPass, authController.newPassword);

module.exports = router;
