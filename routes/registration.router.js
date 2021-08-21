const router = require('express').Router();

const { registrationController } = require('../controllers');

router.get('/', registrationController.getRegistrationPage);

module.exports = router;
