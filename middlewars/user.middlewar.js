const User = require('../database/User');
const ErrorHandler = require('../errors/ErrorHandler');
const userService = require('../services/user.services');
const {
  NOT_FOUND,
  EMAIL_ALREADY,
  INVALID_OPTION
} = require('../config/message');
const statusCode = require('../config/status');
const userValidator = require('../validators/user.validator');

module.exports = {
  isUserPresent: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const user = await userService.getUserById(user_id);
      if (!user) {
        throw new ErrorHandler(statusCode.NOT_FOUND, NOT_FOUND);
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
        throw new ErrorHandler(statusCode.ITEM_ALREADY_EXIST, EMAIL_ALREADY);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateCreateUserBody: (req, res, next) => {
    try {
      const { error } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, error.details[0].message);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validateUpdateUserBody: (req, res, next) => {
    try {
      const { error } = userValidator.updateUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateUserQuery: (req, res, next) => {
    try {
      const { error } = userValidator.queryUserValidator.validate(req.query);
console.log(req.query);
      if (error) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, INVALID_OPTION);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateUserParams: (req, res, next) => {
    try {
      const { error } = userValidator.paramsUserValidator.validate(req.params);

      if (error) {
        throw new ErrorHandler(statusCode.NOT_VALID_DATA, INVALID_OPTION);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
