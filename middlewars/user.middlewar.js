const { User } = require('../database');
const { ErrorHandler } = require('../errors');
const { userValidator } = require('../validators');
const {
  CONSTANTS: { BODY },
  MESSAGES: {
    NOT_FOUND, INPUT_ALREADY, INVALID_OPTION, FORBIDDEN
  },
  statusCode
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

  validateCreateUserBody: (req, res, next) => {
    try {
      const { error } = userValidator.createUserValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
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
        throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message);
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
        throw new ErrorHandler(statusCode.BAD_REQUEST, INVALID_OPTION);
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
        throw new ErrorHandler(statusCode.BAD_REQUEST, INVALID_OPTION);
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
  }
};
