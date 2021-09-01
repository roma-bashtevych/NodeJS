const router = require('express').Router();

const { authController } = require('../controllers');
const {
  authMiddlewar: {
    isUserEmailPresent,
    validateLoginationData
 }
} = require('../middlewars');

router.post('/', validateLoginationData, isUserEmailPresent, authController.showUser);

module.exports = router;
