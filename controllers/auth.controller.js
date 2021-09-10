const { compare } = require('../services/password.services');
const {
  jwtServices, emailServices, passwordServices, userServices
} = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');
const { OAuth, Action_Token } = require('../database');
const {
  VAR: {
    AUTHORIZATION,
    FRONTEND_URL,
    ACTION_SECRET_KEY,
    ACTION_SECRET_EXPIRES_IN
  },
  MESSAGES: { OK, UPDATE_MESSAGE },
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
      console.log(user._id);
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

      const token = jwtServices.generateActionToken(ACTION_SECRET_KEY, ACTION_SECRET_EXPIRES_IN);

      const newToken = token.action_token;
      await Action_Token.create({
        ...token,
        user: user._id
      });

      await emailServices.sendMail(user.email, emailActionsEnum.ACTION,
        { userName: user.name, forgotPasswordURL: `${FRONTEND_URL}/password?token=${newToken}` });

      res.status(statusCode.UPDATE_AND_CREATE).json(OK);
    } catch (e) {
      next(e);
    }
  },

  newPassword: async (req, res, next) => {
    try {
      const { loginUser, body: { password } } = req;
      const action_token = req.get(AUTHORIZATION);

      const hashedPassword = await passwordServices.hash(password);

      await userServices.updateUserById({ _id: loginUser.id }, { password: hashedPassword });

      await emailServices.sendMail(loginUser.email, emailActionsEnum.WELCOME, { userName: loginUser.name });

      await Action_Token.deleteOne({ action_token });

      await OAuth.deleteMany({ user: loginUser.id });

      res.status(statusCode.UPDATE_AND_CREATE).json(OK);
    } catch (e) {
      next(e);
    }
  },

  changePassword: async (req, res, next) => {
    try {
      const { loginUser, body: { old_password, password } } = req;

      await compare(loginUser.password, old_password);
      const hashedPassword = await passwordServices.hash(password);

      await userServices.updateUserById(loginUser, { password: hashedPassword });
      await emailServices.sendMail(loginUser.email, emailActionsEnum.CHANGE, { userName: loginUser.name });

      res.status(statusCode.UPDATE_AND_CREATE).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
