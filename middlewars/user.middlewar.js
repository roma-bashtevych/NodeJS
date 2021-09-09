const { User } = require('../database');
const { ErrorHandler } = require('../errors');
const { userValidator } = require('../validators');
const {
  CONSTANTS: { BODY },
  MESSAGES: {
    NOT_FOUND, INPUT_ALREADY, FORBIDDEN
  },
  statusCode,
  userRolesEnum
} = require('../config');

module.exports = {
  isUserNotPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (!user) {
        throw new ErrorHandler(statusCode.CONFLICT, INPUT_ALREADY);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  isUserPresent: (req, res, next) => {
    try {
      const { user } = req;

      if (user) {
        throw new ErrorHandler(statusCode.NOT_FOUND, NOT_FOUND);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserRole: (roleArr = []) => (req, res, next) => {
    try {
      const { loginUser, user } = req;

      if (user.id === loginUser.id) {
        return next();
      }

      if (!roleArr.length) {
        return next();
      }

      if (!roleArr.includes(loginUser.role)) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam: (paramName, searchIn = BODY, dbFiled = paramName) => async (req, res, next) => {
    try {
      const value = req[searchIn][paramName];

      const user = await User.findOne({ [dbFiled]: value });

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  checkUser: (req, res, next) => {
    try {
      const { loginUser, user } = req;

      if (loginUser.id !== user.id) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validForgotPass: (req, res, next) => {
    try {
      const { error } = userValidator.updateForgotValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.FORBIDDEN, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateDataDynamic: (validator, data = BODY) => (req, res, next) => {
    try {
      const { error } = validator.validate(req[data]);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkAdminRole: (req, res, next) => {
    try {
      const user = req.loginUser;

      if (user.role !== userRolesEnum.ADMIN) {
        throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
