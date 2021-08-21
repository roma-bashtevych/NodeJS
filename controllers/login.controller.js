const users = require('../database/users');

module.exports = {
  getLoginPage: (req, res) => {
    res.json('login page here');
  },
  loginUser: (req, res) => {
    const { login, password } = req.body;

    const userIndex = users.findIndex((user) => user.login === login && +user.password === +password);

    if (userIndex !== -1) {
      res.json(`Hello ${login}, how are you?`);
      return;
    }
    res.json('sorry your login undefined, please registration');
  }
};
