const userService = require('../services/user.services');
const { DELETED_MESSAGE, UPDATE_MESSAGE } = require('../config/message');

module.exports = {
  getSingleUser: (req, res, next) => {
    try {
      const { user } = req;
      res.json(user);
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
      const createdUser = await userService.createUser(req.body);

      res.json(createdUser);
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
