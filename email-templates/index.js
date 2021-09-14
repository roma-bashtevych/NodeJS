const { emailActionsEnum } = require('../config');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'WELCOME NEW USER !!!'
  },
  [emailActionsEnum.UPDATE]: {
    templateName: 'update',
    subject: 'UPDATE INFORMATION!!!'
  },
  [emailActionsEnum.AUTH]: {
    templateName: 'auth',
    subject: 'LOGINATION USER !!!'
  },
  [emailActionsEnum.DELETE_ADMIN]: {
    templateName: 'deleteAdmin',
    subject: 'USER DELETED BY ADMIN !!!'
  },
  [emailActionsEnum.DELETE_USER]: {
    templateName: 'deleteUser',
    subject: 'USER DELETED !!!'
  },
  [emailActionsEnum.ACTION]: {
    templateName: 'action',
    subject: 'ACTION !!!'
  },
  [emailActionsEnum.CHANGE]: {
    templateName: 'changePassword',
    subject: 'Your password was changed'
  },
  [emailActionsEnum.ADMIN]: {
    templateName: 'admin',
    subject: 'Welcome you are admin now '
  },
  [emailActionsEnum.HELLO]: {
    templateName: 'helloUser',
    subject: 'Hello user. Where are you? '
  }
};
