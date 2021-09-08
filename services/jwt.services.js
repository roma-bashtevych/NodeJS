const jwt = require('jsonwebtoken');
const util = require('util');

const verifyPromise = util.promisify(jwt.verify);

const { ErrorHandler } = require('../errors');
const {
  statusCode, MESSAGES: { NOT_VALID_TOKEN },
  VAR: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FORGOT_SECRET_KEY },
  CONSTANTS: { ACCESS }
} = require('../config');

module.exports = {
  generateTokenPair: () => {
    const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '15m' });

    return {
      access_token,
      refresh_token
    };
  },

  generateForgotToken: () => {
    const forgot_token = jwt.sign({}, FORGOT_SECRET_KEY, { expiresIn: '30m' });

    return {
      forgot_token,
    };
  },

  verifyForgotToken: async (token) => {
    try {
      await jwt.verify(token, FORGOT_SECRET_KEY);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
    }
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    try {
      const secretWord = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      await verifyPromise(token, secretWord);
    } catch (e) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, NOT_VALID_TOKEN);
    }
  }
};
