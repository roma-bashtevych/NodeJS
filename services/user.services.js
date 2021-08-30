const User = require('../database/User');

module.exports = {
  findUsers: (query) => User.find(query),

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userId) => User.deleteOne(userId),

  getUserById: (userId) => User.findById(userId),

  updateUserById: (userId, data) => User.updateOne(userId, data)
};
