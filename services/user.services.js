const { User } = require('../database');

module.exports = {
  findUsers: (query) => User.find(query),

  createUser: (userObject) => User.create(userObject),

  deleteUser: (userId) => User.deleteOne(userId),

  updateUserById: (userId, data) => User.updateOne(userId, data),

  findByIdAndUpdate: (userId, data, newObj) => User.findByIdAndUpdate(userId, data, newObj)

};
