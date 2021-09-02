module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/apr-2021',
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'secret_word',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'secret_word_2',
  AUTHORIZATION: 'Authorization'
};
