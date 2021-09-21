const clientServices = require('../services/mySQL/clients.services');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const clients = await clientServices.findALl();
      res.json(clients);
    } catch (e) {
      next(e);
    }
  },
  createClient: async (req, res, next) => {
    try {
      await clientServices.createClient(req.body);

      res.json('OK');
    } catch (e) {
      next(e);
    }
  }
};
