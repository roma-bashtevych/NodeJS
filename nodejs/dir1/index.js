const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]

const path = require('path');
const fs = require('fs');

const manOld = path.join(__dirname, 'manOlder20');
const manYounger = path.join(__dirname, 'manYounger20');
const womanOld = path.join(__dirname, 'womanOlder20');
const womanYoung = path.join(__dirname, 'womanYounger20');

fs.mkdir(manOld, err => {
    if (err) {
        console.log(err)
        return;
    }
    fs.mkdir(manYounger, err => {
        if (err) {
            console.log(err)
            return;
        }
        fs.mkdir(womanOld, err => {
            if (err) {
                console.log(err)
                return;
            }
            fs.mkdir(womanYoung, err => {
                if (err) {
                    console.log(err)
                    return;
                }
                createUsersFolders(users);
            })
        })
    })
})

function createUsersFolders(arr) {
    for (let user of arr) {
        if (user.age >= 20 && user.gender === 'male') {
            writeNewFile(manOld, user)
        } else if (user.age <= 20 && user.gender === 'male') {
            writeNewFile(manYounger, user)
        } else if (user.age >= 20 && user.gender === 'female') {
            writeNewFile(womanOld, user)
        } else {
            writeNewFile(womanYoung, user)
        }
    }
}


function writeNewFile(nameFolder, user) {
    fs.writeFile(path.join(nameFolder, `${user.name}.txt`),
        `${JSON.stringify(user)}`,
        err => console.log(err))
}