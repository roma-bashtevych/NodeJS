module.exports = {
  EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
  PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  CURRENT_YEAR: new Date().getFullYear(),
  USER_ID: 'user_id',
  CAR_ID: 'car_id',
  EMAIL: 'email',
  PARAMS: 'params',
  DB_FIELD: '_id',
  REFRESH: 'refresh',
  ACCESS: 'access',
  BODY: 'body',
  QUERY: 'query',
  PHOTO_MAX_SIZE: 5 * 1024 * 1024,
  MIMETYPES: {
    PHOTO: [
      'image/jpeg',
      'image/png'
    ]
  },
  AMAZON: 'amazonaws.com/',
  USERS: 'users',
  DAY: 'day',
  MONTH: 'month',
  CRON_DEL_TOKEN: '0 0 1 * * *',
  CRON_SEND_MAIL: '30 6 * * 1,3,5'
};
