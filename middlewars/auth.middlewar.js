const { User } = require('../database/User');
const ErrorHandler = require('../errors/ErrorHandler');
const passwordHasher = require('../utils/user.util');
const authentValidator = require('../validators/auth.validator');
const { WRONG } = require('../config/message');
const statusCode = require('../config/status');

module.exports = {
  findByEmailPassword: async (req, res, next) => {
    try {
      const { login, password } = req.body;
      const userByLogin = await User.findOne({ login });

      if (!userByLogin) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, WRONG);
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
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, WRONG);
      }

      next();
    } catch (err) {
      next(err);
    }
  },
};
