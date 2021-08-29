const userService = require('../services/user.services');
const { DELETED_MESSAGE, UPDATE_MESSAGE } = require('../config/message');
const passwordServices = require('../services/password.services');
const User = require('../database/User');
const { userNormalizator } = require('../utils/user.util');

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
      const users = await userService.findUsers({});
      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await passwordServices.hash(password);
      const createdUser = await User.create({ ...req.body, password: hashedPassword });

      const userToReturn = userNormalizator(createdUser);

      res.json(userToReturn);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userService.deleteUser({ _id: user_id });
      res.status(204).json(DELETED_MESSAGE);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      await userService.updateUserById({ _id: user_id }, req.body);

      res.status(201).json(UPDATE_MESSAGE);
    } catch (e) {
      next(e);
    }
  }
};
