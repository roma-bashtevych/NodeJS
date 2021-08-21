const express = require('express');

const { PORT } = require('./config/var');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, loginRouter, registrationRouter } = require('./routes');

app.get('/ping', (req, res) => res.json('pong'));
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/registration', registrationRouter);

app.listen(PORT, () => {
  console.log('App listen', PORT);
});
