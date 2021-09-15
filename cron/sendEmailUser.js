const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { emailServices } = require('../services');
const { emailActionsEnum, CONSTANTS: { DAY }, DATABASE_TABLES: { USER } } = require('../config');
const { OAuth } = require('../database');

module.exports = async () => {
  const tenDays = datJs.utc().subtract(10, DAY);

  const tokens = await OAuth.find({ createdAt: { $lte: tenDays } }).populate(USER);

  const promise = tokens.map(async (token) => {
    const { user: { email, name } } = token;

    await emailServices(email, emailActionsEnum.HELLO, { userName: name });
  });

  await Promise.all(promise);
};
