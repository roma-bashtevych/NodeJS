const { User } = require('../database');

module.exports = {
  findUsers: (query) => User.find(query),

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userId) => User.deleteOne(userId),

  getUserById: (userId) => User.findById(userId),

  getFindOne: (userEmailOrLogin) => User.findOne(userEmailOrLogin),

  updateUserById: (userId, data) => User.updateOne(userId, data)
};
