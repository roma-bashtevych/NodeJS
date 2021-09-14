const cron = require('node-cron');

const sendMailUser = require('./sendEmailUser');

module.exports = () => {
  cron.schedule('30 6 * * 1,3,5', () => {
    sendMailUser();
  });
};
