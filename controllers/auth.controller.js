const { compare } = require('../services/password.services');
const {
  jwtServices, emailServices, passwordServices, userServices
} = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');
const { OAuth, Forgot_Token } = require('../database');
const {
  VAR: { AUTHORIZATION },
  MESSAGES: { OK },
  statusCode,
  emailActionsEnum
} = require('../config');

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

      await emailServices.sendMail(user.email, emailActionsEnum.AUTH, { userName: user.name });
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
  },

  forgot: async (req, res, next) => {
    try {
      const { user } = req;

      const token = jwtServices.generateForgotToken();

      const newToken = token.forgot_token;
      await Forgot_Token.create({
        ...token,
        user
      });

      await emailServices.sendMail(user.email, emailActionsEnum.FORGOT,
        { userName: user.name, token: newToken });

      res.status(statusCode.UPDATE_AND_CREATE).json({
        ...token,
        user: userNormalizator(user)
      });
    } catch (e) {
      next(e);
    }
  },

  newPassword: async (req, res, next) => {
    try {
      const { loginUser, body: { password } } = req;

      const hashedPassword = await passwordServices.hash(password);

      await userServices.updateUserById({ password: hashedPassword });

      await emailServices.sendMail(loginUser.email, emailActionsEnum.WELCOME, { userName: loginUser.name });

      await Forgot_Token.deleteOne({ user: loginUser.id });

      await OAuth.deleteMany({ user: loginUser.id });

      res.status(statusCode.UPDATE_AND_CREATE).json(OK);
    } catch (e) {
      next(e);
    }
  },
};
