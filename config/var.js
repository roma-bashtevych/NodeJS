module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/apr-2021',
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'secret_word',
  ACTION_SECRET_KEY: process.env.ACTION_SECRET_KEY || 'secret_word_3',
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY || 'secret_word_4',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'secret_word_2',
  AUTHORIZATION: 'Authorization',
  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'gdgdg@ukr.net',
  NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
  ACTION_SECRET_EXPIRES_IN: process.env.ACTION_SECRET_EXPIRES_IN || '30m',
  ADMIN_SECRET_EXPIRES_IN: process.env.ADMIN_SECRET_EXPIRES_IN || '1d',
};
