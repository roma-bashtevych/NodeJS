const bcrypt = require('bcrypt');
const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG } = require('../config/message');
const statusCode = require('../config/status');

module.exports = {
  hash: (password) => bcrypt.hash(password, 10),
  compare: async (hash, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hash);

    if (!isPasswordMatched) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG);
    }
  }
};
