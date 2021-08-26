const User = require('../database/User');

module.exports = {
  findUsers: () => User.find({}),

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userId) => User.deleteOne(userId),

  getUserById: (userId) => User.findById(userId),

  updateUserById: (userId, data) => User.findByIdAndUpdate(userId, data)
};
