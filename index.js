const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const expressRateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');

require('dotenv').config();

const { VAR: { PORT, DATABASE_URL, ALOWED_ORIGINS }, MESSAGES: { NOT_FOUND, CORS }, statusCode } = require('./config');
const { ErrorHandler } = require('./errors');
const cronJobs = require('./cron');

const { userRouter, carRouter, authRouter } = require('./routes');
const swaggerJson = require('./docs/swagger.json');

const app = express();

mongoose.connect(DATABASE_URL);

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(expressRateLimit({
  windowMS: 15 * 60 * 1000,
  max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.get('/ping', (req, res) => res.json('pong'));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log('App listen', PORT);
  cronJobs();
  require('./utils/defaultData');
});

function _notFoundError(err, req, res, next) {
  next({
    status: err.status || statusCode.NOT_FOUND,
    message: err.message || NOT_FOUND
  });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || statusCode.SERVER_ERROR)
    .json({
      message: err.message
    });
}

function _configureCors(origin, callback) {
  const writeList = ALOWED_ORIGINS.split(';');

  if (!origin && process.env.NODE_ENV === 'dev') {
    return callback(null, true);
  }

  if (!writeList.includes(origin)) {
    return callback(new ErrorHandler(statusCode.FORBIDDEN, CORS), false);
  }

  return callback(null, true);
}
