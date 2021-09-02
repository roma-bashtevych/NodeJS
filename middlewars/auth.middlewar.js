const statusCode = require('../config/status');
const { ErrorHandler } = require('../errors');
const { authValidator } = require('../validators');
const {
  EMPTY_LOGIN_PASS,
  UNAUTHORIZED
} = require('../config/message');
const { AUTHORIZATION } = require('../config/var');
const { verifyToken } = require('../services/jwt.services');
const { OAuth } = require('../database');

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

      const tokenfromDB = await OAuth.findOne({ access_token }).populate('user');

      if (!tokenfromDB) {
        throw new ErrorHandler(401, 'Not valid token');
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

      await verifyToken(refresh_token, 'refresh');

      const tokenfromDB = await OAuth.findOne({ refresh_token }).populate('user');

      if (!tokenfromDB) {
        throw new ErrorHandler(401, 'Not valid token');
      }

      req.loginUser = tokenfromDB.user;

      next();
    } catch (e) {
      next(e);
    }
  },
};
