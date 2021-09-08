const { userServices, passwordServices, emailServices } = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');
const {
  MESSAGES: { UPDATE_MESSAGE }, statusCode, emailActionsEnum, userRolesEnum
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
      await emailServices.sendMail(userToReturn.email, emailActionsEnum.WELCOME, { userName: userToReturn.name });
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
  }
};
