const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, DATABASE_URL } = require('./config/var');
const { NOT_FOUND } = require('./config/message');
const statusCode = require('./config/status');

const app = express();

mongoose.connect(DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, carRouter, authRouter } = require('./routes');

app.get('/ping', (req, res) => res.json('pong'));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
  console.log('App listen', PORT);
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
