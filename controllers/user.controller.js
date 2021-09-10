const {
  userServices,
  passwordServices,
  emailServices,
  jwtServices
} = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');
const { Action_Token } = require('../database');
const {
  MESSAGES: { UPDATE_MESSAGE, ACTIVAT },
  statusCode,
  emailActionsEnum,
  userRolesEnum,
  VAR: {
    AUTHORIZATION,
    FRONTEND_URL,
    ADMIN_SECRET_KEY,
    ADMIN_SECRET_EXPIRES_IN,
    ACTION_SECRET_KEY,
    ACTION_SECRET_EXPIRES_IN
  }
} = require('../config');

module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      const { user } = req;
      const userToReturn = userNormalizator(user);

      res.json(userToReturn);
    } catch (e) {
      next(e);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userServices.findUsers(req.query);
      const allUsers = users.map((user) => userNormalizator(user));

      res.json(allUsers);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashedPassword = await passwordServices.hash(password);

      const createdUser = await userServices.createUser({ ...req.body, password: hashedPassword });
      const userToReturn = userNormalizator(createdUser);
      const actionToken = jwtServices.generateActionToken(ACTION_SECRET_KEY, ACTION_SECRET_EXPIRES_IN);
      const newActionToken = actionToken.action_token;

      await Action_Token.create({
        ...actionToken,
        user: userToReturn._id
      });

      await emailServices.sendMail(userToReturn.email, emailActionsEnum.WELCOME,
        { userName: userToReturn.name, forgotPasswordURL: `${FRONTEND_URL}/password?token=${newActionToken}` });
      res.status(statusCode.OK).json(userToReturn);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const user = req.loginUser;
      const userByid = req.user;

      if (user.role === userRolesEnum.ADMIN) {
        await emailServices.sendMail(userByid.email, emailActionsEnum.DELETE_ADMIN, { userName: userByid.name });
      } else {
        await emailServices.sendMail(userByid.email, emailActionsEnum.DELETE_USER, { userName: userByid.name });
      }

      await userServices.deleteUser({ _id: user_id });
      res.sendStatus(statusCode.DELETED);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userServices.updateUserById({ _id: user_id }, req.body);

      await emailServices.sendMail(req.user.email, emailActionsEnum.UPDATE, { userName: req.user.name });
      res.status(statusCode.UPDATE_AND_CREATE).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  activateUser: async (req, res, next) => {
    try {
      const user = req.loginUser;
      const action_token = req.get(AUTHORIZATION);

      await userServices.updateUserById({ _id: user.id }, { activat: true });
      console.log(user.id);
      await Action_Token.deleteOne({ action_token });
      res.json(ACTIVAT);
    } catch (e) {
      next(e);
    }
  },

  createNewAdmin: async (req, res, next) => {
    try {
      const admin = req.loginUser;
      const createdUser = await userServices.createUser({ ...req.body });

      const actionToken = jwtServices.generateActionToken(ADMIN_SECRET_KEY, ADMIN_SECRET_EXPIRES_IN);
      const newActionToken = actionToken.action_token;

      await Action_Token.create({
        ...actionToken,
        user: createdUser._id
      });

      await emailServices.sendMail(createdUser.email, emailActionsEnum.ADMIN,
        { userName: admin.name, forgotPasswordURL: `${FRONTEND_URL}/password?token=${newActionToken}` });
      res.status(statusCode.OK).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  changePasswordAdmin: async (req, res, next) => {
    try {
      const { loginUser, body: { password } } = req;
      const action_token = req.get(AUTHORIZATION);

      const hashedPassword = await passwordServices.hash(password);

      await userServices.updateUserById({ _id: loginUser.id }, { password: hashedPassword });

      await emailServices.sendMail(loginUser.email, emailActionsEnum.CHANGE, { userName: loginUser.name });

      await Action_Token.deleteOne({ action_token });

      res.status(statusCode.UPDATE_AND_CREATE).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
