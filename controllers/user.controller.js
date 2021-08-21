const path = require('path');
const fs = require('fs');
const database = require('../database/users');
const users = require('../database/users');

const userPath = path.join(__dirname, '..', 'database', 'users.js');

module.exports = {
  getSingleUser: (req, res) => {
    const { user_id } = req.params;
    const user = database[user_id];

    if (!user) {
      res.status(404).json('User not found');
      return;
    }
    res.json(user);
  },

  getAllUsers: (req, res) => {
    res.json(users);
  },

  createUser: (req, res) => {
    const { login } = req.body;

    const newUser = users.find((user) => user.login === login);

    if (!newUser) {
      users.push(req.body);
      fs.writeFile(userPath, `module.exports = ${JSON.stringify(users)}`,
        (err) => {
          if (err) {
            console.log(err);
          }
        });
      res.json(users);
      return;
    }
    res.json('sorry user don"t add to users array');
  }
};
