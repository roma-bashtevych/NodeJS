const router = require('express').Router();

const { authController } = require('../controllers');
const {
  authMiddlewar: {
    isUserEmailPresent,
    validateLoginationData
 }
} = require('../middlewars');

router.post('/', isUserEmailPresent, validateLoginationData, authController.loginUser);

module.exports = router;
