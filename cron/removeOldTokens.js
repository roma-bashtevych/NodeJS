const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { OAuth, Action_Token } = require('../database');
const { CONSTANTS: { MONTH } } = require('../config');

module.exports = async () => {
  const previousMonth = datJs.utc().subtract(1, MONTH);

  await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
  await Action_Token.deleteMany({ createdAt: { $lte: previousMonth } });
};
