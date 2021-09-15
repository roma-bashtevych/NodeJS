const cron = require('node-cron');

const { CONSTANTS: { CRON_DEL_TOKEN, CRON_SEND_MAIL } } = require('../config');

const sendMailUser = require('./sendEmailUser');
const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
  cron.schedule(CRON_DEL_TOKEN, async () => {
    await removeOldTokens();
  });

  cron.schedule(CRON_SEND_MAIL, async () => {
    await sendMailUser();
  });
};
