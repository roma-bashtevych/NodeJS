const { ErrorHandler } = require('../errors');
const { authValidator } = require('../validators');
const { verifyToken, verifyForgotToken } = require('../services/jwt.services');
const { OAuth, Forgot_Token } = require('../database');
const {
  statusCode,
  MESSAGES: { EMPTY_LOGIN_PASS, UNAUTHORIZED, NOT_VALID_TOKEN },
  VAR: { AUTHORIZATION },
  DATABASE_TABLES: { USER },
  CONSTANTS: { REFRESH }
} = require('../config');

module.exports = {
  validateLoginationData: (req, res, next) => {
    try {
      const { error } = authValidator.authValidator.validate(req.body);

      if (error) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, EMPTY_LOGIN_PASS);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  validateAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      if (!access_token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, UNAUTHORIZED);
      }

      await verifyToken(access_token);

      const tokenfromDB = await OAuth.findOne({ access_token }).populate(USER);

      if (!tokenfromDB) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
      }

      req.loginUser = tokenfromDB.user;
      next();
    } catch (e) {
      next(e);
    }
  },

  validateRefreshToken: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);

      if (!refresh_token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, UNAUTHORIZED);
      }

      await verifyToken(refresh_token, REFRESH);

      const tokenfromDB = await OAuth.findOne({ refresh_token }).populate(USER);

      if (!tokenfromDB) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
      }

      req.loginUser = tokenfromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  validateForgotToken: async (req, res, next) => {
    try {
      const forgot_token = req.get(AUTHORIZATION);

      if (!forgot_token) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, UNAUTHORIZED);
      }

      await verifyForgotToken(forgot_token);

      const tokenfromDB = await Forgot_Token.findOne({ forgot_token }).populate(USER);

      if (!tokenfromDB) {
        throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
      }

      req.loginUser = tokenfromDB.user;
      next();
    } catch (e) {
      next(e);
    }
  },
};
