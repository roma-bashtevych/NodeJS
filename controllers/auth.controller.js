const { compare } = require('../services/password.services');
const { jwtServices } = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');
const { OAuth } = require('../database');
const { VAR: { AUTHORIZATION }, MESSAGES: { OK }, statusCode } = require('../config');

module.exports = {
  loginUser: async (req, res, next) => {
    try {
      const {
        user,
        body: { password }
      } = req;

      await compare(user.password, password);

      const tokenPair = jwtServices.generateTokenPair();
      await OAuth.create({
        ...tokenPair,
        user: user._id
      });

      res.status(statusCode.UPDATE_AND_CREATE).json({
        ...tokenPair,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },

  logoutUser: async (req, res, next) => {
    try {
      const access_token = req.get(AUTHORIZATION);

      await OAuth.deleteOne({ access_token });
      res.status(statusCode.DELETED).json(OK);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refresh_token = req.get(AUTHORIZATION);
      const user = req.loginUser;

      await OAuth.deleteOne({ refresh_token });

      const tokenPair = jwtServices.generateTokenPair();
      await OAuth.create({
        ...tokenPair,
        user: user._id
      });

      res.status(statusCode.UPDATE_AND_CREATE).json({
        ...tokenPair,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  }
};
