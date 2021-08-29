const { User } = require('../database/User');
const ErrorHandler = require('../errors/ErrorHandler');
const passwordHasher = require('../utils/user.util');
const authentValidator = require('../validators/auth.validator');
const { WRONG } = require('../config/message');

module.exports = {
  findByEmailPassword: async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const userByLogin = await User.findOne({ login });

      if (!userByLogin) {
        throw new ErrorHandler(400, WRONG);
      }

      await passwordHasher.compare(userByLogin.password, password);

      req.user = userByLogin;

      next();
    } catch (err) {
      next(err);
    }
  },
  checkAuthDataValid: (req, res, next) => {
    try {
      const { error } = authentValidator.createValidAuth.validate(req.body);

      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};
