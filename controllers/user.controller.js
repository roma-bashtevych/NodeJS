const userService = require('../services/user.services');

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
      res.status(204).json(`User with id ${user_id} is deleted`);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      await userService.updateUserById(userId, req.body);

      res.json('updated');
    } catch (e) {
      next(e);
    }
  },
};
