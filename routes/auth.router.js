const router = require('express').Router();

const { CONSTANTS: { EMAIL } } = require('../config');

const { authController } = require('../controllers');
const {
  authMiddlewar: {
    validateLoginationData,
    validateAccessToken,
    validateRefreshToken
 }, userMiddlewar: {
    isUserNotPresent,
    getUserByDynamicParam
  }
} = require('../middlewars');

router.post('/', validateLoginationData, getUserByDynamicParam(EMAIL), isUserNotPresent, authController.loginUser);
router.post('/logout', validateAccessToken, authController.logoutUser);
router.post('/refresh', validateRefreshToken, authController.refresh);

module.exports = router;
