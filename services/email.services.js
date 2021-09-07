const path = require('path');
const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');

const { VAR: { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, FRONTEND_URL } } = require('../config');
const allTemplates = require('../email-templates');
const { ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NO_REPLY_EMAIL,
    pass: NO_REPLY_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, emailActions, context = {}) => {
  const templateInfo = allTemplates[emailActions];

  if (!templateInfo) {
    throw new ErrorHandler(500, 'wrong template name');
  }

  const { templateName, subject } = templateInfo;
  context.frontEndURL = FRONTEND_URL;

  const html = await templateParser.render(templateName, context);

  transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject,
    html
  });
};
module.exports = {
  sendMail
};
