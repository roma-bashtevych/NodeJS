const jwt = require('jsonwebtoken');
const util = require('util');
const { ErrorHandler } = require('../errors');
const statusCode = require('../config/status');
const { NOT_VALID_TOKEN } = require('../config/message');

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require('../config/var');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '15m' });

    return {
      access_token,
      refresh_token
    };
  },

  verifyToken: async (token, tokenType = 'access') => {
    try {
      const secretWord = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
    }
  }
};
