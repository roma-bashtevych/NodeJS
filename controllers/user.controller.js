const { userServices } = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');
const passwordServices = require('../services/password.services');
const { MESSAGES: { DELETED_MESSAGE, UPDATE_MESSAGE }, statusCode } = require('../config');

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

      res.status(statusCode.OK).json(userToReturn);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userServices.deleteUser({ _id: user_id });
      res.status(statusCode.DELETED).json(DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userServices.updateUserById({ _id: user_id }, req.body);

      res.status(statusCode.UPDATE_AND_CREATE).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
