// Підключамо модулі
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

// Виносимо змінні в окремі файли
const {PORT} = require('./config/var');
const users = require('./database/users');

const userPath = path.join(__dirname, 'database', 'users.js');
// Налаштовуємо -express для роботи з json;  -handlebars
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

// метод get на стартову сторінку логінації
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/registration', (req, res) => {
    res.render('registration');
})
// передаємо опшинами масив який буде відображатись на сторінці
app.get('/users', (req, res) => {
    res.render('users', {title: 'users', users});
});

// динамічно змінюємо user_id залежно від місця юзера в масиві
app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;
    const countUser = users[user_id];
    if (!countUser) {
        res.status(404).end('User Not Found');
    }
    res.render('user', {countUser});
});
// Шукаємо співпадіння логіна і пароля, якщо співпадіння немає пушимо новий обєкт в масив і записуємо у файл
app.post('/registration', (req, res) => {
    const newUser = users.find(user => {
        return user.login === req.body.login && user.password === +req.body.password;
    })
     if (!newUser) {
        users.push(req.body);
        fs.writeFile(userPath, `module.exports = ${JSON.stringify(users)}`,err => console.log(err))
        res.redirect('/users');
        return
    }
    res.render('/login');
})

app.post('/login', (req, res) => {
    const userIndex = users.findIndex(user => {
        return user.login === req.body.login && +user.password === +req.body.password;
    })
    if (userIndex !== -1) {
        res.redirect(`/users/${userIndex}`);
        return
    }
    res.redirect('/registration');
})

app.listen(PORT, () => {
    console.log(`app listen port ${PORT}`);
})