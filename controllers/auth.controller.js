const passwordService = require('../services/password.services');
const userNormalizer = require('../utils/user.util');

module.exports = {
   loginUser: async (req, res, next) => {
    try {
      const { user, password } = req.body;

      await passwordService.compare(user.password, password);

      const userForResponce = userNormalizer(user);

      res.json(userForResponce);
    } catch (e) {
      next(e);
    }
  }
};
