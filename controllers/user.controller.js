const { writeUser, getUsers } = require('../services/user.services');

module.exports = {
  getSingleUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const users = await getUsers();
      const user = users[user_id];

      if (!user) {
        res.status(404).json('User not found');
        return;
      }
      res.json(user);
    } catch (e) {
      res.status(404).res.json('Error');
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (e) {
      res.status(404).res.json('Error');
    }
  },

  createUser: async (req, res) => {
    try {
      const { login } = req.body;
      const users = await getUsers();
      const newUser = users.find((user) => user.login === login);

      if (!newUser) {
        users.push(req.body);
        await writeUser(users);
        res.json(users);
        return;
      }
      res.json('sorry user don"t add to users array');
    } catch (e) {
      res.status(404).res.json('Error');
    }
  }
};
