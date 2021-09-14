const datJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

datJs.extend(utc);

const { emailServices } = require('../services');
const { emailActionsEnum } = require('../config');
const { User } = require('../database');

module.exports = async () => {
  const tenDays = datJs.utc().subtract(10, 'day');

  const users = await User.find({ lastLogin: { $lt: tenDays } });
  if (!users) {
    console.log('no users logged in 10 days ago');
    return;
  }
  // const emails = users.map((user) => user.email);
  //  await emailServices.sendMail(emails, emailActionsEnum.HELLO);
  for (const user of users) {
    // eslint-disable-next-line no-await-in-loop
    await emailServices.sendMail(user.email, emailActionsEnum.HELLO, { userName: user.name });
  }
};
