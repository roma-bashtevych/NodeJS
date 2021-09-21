const router = require('express').Router();

const { clientController } = require('../controllers');

router.get('/', clientController.getAll);
router.post('/', clientController.createClient);

module.exports = router;
