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
  VAR: { FRONTEND_URL }
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
      const actionToken = jwtServices.generateActionToken();
      const newActionToken = actionToken.action_token;

      await Action_Token.create({
        ...actionToken,
        user: userToReturn
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
      if (req.user.role === userRolesEnum.ADMIN) {
        await emailServices.sendMail(req.user.email, emailActionsEnum.DELETE_ADMIN, { userName: req.user.name });
      } else {
        await emailServices.sendMail(req.user.email, emailActionsEnum.DELETE_USER, { userName: req.user.name });
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

      await userServices.updateUserById(user, { activat: true });

           res.json(ACTIVAT);
    } catch (e) {
      next(e);
    }
  },
};
