const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddlewar } = require('../middlewars');

router.post('/', authMiddlewar.checkAuthDataValid, authMiddlewar.findByEmailPassword, authController.showUser);

module.exports = router;
