const User = require('../database/User');
const ErrorHandler = require('../errors/ErrorHandler');
const userService = require('../services/user.services');
const {
  NOT_FOUND,
  INPUT_ALREADY,
  INVALID_OPTION,
  FORBIDDEN
} = require('../config/message');
const statusCode = require('../config/status');
const { userValidator } = require('../validators');

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
      const {
        email,
        login
      } = req.body;

      const userByEmailorLogin = await userService.getFindOne({
        $or: [
          { email },
          { login }
        ]
      });

      if (userByEmailorLogin) {
        throw new ErrorHandler(statusCode.ITEM_ALREADY_EXIST, INPUT_ALREADY);
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

  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { role } = req.user;

      if (!roleArr.length) {
        return next();
      }

      if (!roleArr.includes(role)) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN);
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, searchIn = 'body', dbFiled = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbFiled]: value });

      if (!user) {
        throw new ErrorHandler(statusCode.NOT_FOUND, INVALID_OPTION);
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }
};
