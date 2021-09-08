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
  [emailActionsEnum.FORGOT]: {
    templateName: 'forgot',
    subject: 'FORGOT !!!'
  }
};
