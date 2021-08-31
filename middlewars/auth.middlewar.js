const User = require('../database/User');
const statusCode = require('../config/status');
const ErrorHandler = require('../errors/ErrorHandler');
const { authValidator } = require('../validators');
const { EMPTY_LOGIN_PASS } = require('../config/message');

module.exports = {
  isUserEmailPresent: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (!userByEmail) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, EMPTY_LOGIN_PASS);
      }

      req.user = userByEmail;

      next();
    } catch (e) {
      next(e);
    }
  },

  validateLoginationData: (req, res, next) => {
    try {
      const { error } = authValidator.authValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, EMPTY_LOGIN_PASS);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
