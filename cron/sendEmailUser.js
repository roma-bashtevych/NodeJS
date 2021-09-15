const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { emailServices } = require('../services');
const { emailActionsEnum, CONSTANTS: { DAY } } = require('../config');
const { User } = require('../database');

module.exports = async () => {
  const tenDays = datJs.utc().subtract(10, DAY);

  const users = await User.find({ lastLogin: { $lt: tenDays } });
  if (!users) {
    console.log('no users logged in 10 days ago');
    return;
  }

  for await (const user of users) {
    await emailServices.sendMail(user.email, emailActionsEnum.HELLO, { userName: user.name });
  }
};
