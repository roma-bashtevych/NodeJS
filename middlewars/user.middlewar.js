const User = require('../database/User');
const ErrorHandler = require('../errors/ErrorHandler');
const userService = require('../services/user.services');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      // const user = await User.findById(user_id);
      const user = await userService.getUserById(user_id);
      if (!user) {
        throw new ErrorHandler(418, 'user not found');
      }
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkUniqueEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        throw new ErrorHandler(409, `Email ${email} is already exist`);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  isValidUserData: (req, res, next) => {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        throw new ErrorHandler(400, 'login and password aren"t');
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
