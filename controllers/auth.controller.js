const { passwordServices } = require('../services');
const { userNormalizator: { userNormalizator } } = require('../utils');

module.exports = {
  showUser: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { user } = req;

      await passwordServices.compare(user.password, password);

      const userForResponce = userNormalizator(user);

      res.json(userForResponce);
    } catch (e) {
      next(e);
    }
  }
};
