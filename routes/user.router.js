const router = require('express').Router();

const { userController } = require('../controllers');
const { isUserPresent, checkUniqueEmail, isValidUserData } = require('../middlewars/user.middlewar');

router.get('/', userController.getAllUsers);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.post('/', isValidUserData, checkUniqueEmail, userController.createUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);
router.patch('/:user_id', isUserPresent, userController.updateUser);

module.exports = router;

// Вам необхідно реалізувати CRUD на дві сутності (user, car)
//
// Мають бути реалізовані такі методи:
//   1) Create user
// 2) Get all users
// 3) Get user by id
// 4) Delete current user
// 5) Update user
//
// Все це має бути розбито по роутах, контроллерах, сервісах з обовязковою перевіркою всього що приходить через мідлвари.
//   Також всі меджік стрінги мають бути винесені в константи.
//
//   додати errorHandler
