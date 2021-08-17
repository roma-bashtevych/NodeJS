// Посортувати юзерів по папках.
//  У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// Вам потрібно перемістити всіх дівчат на 1800 а хлопців на 2000.

const path = require('path');
const fs = require('fs');

const dir1800 = path.join(__dirname, '1800');
const dir2000 = path.join(__dirname, '2000');


// створюємо папку 1800
//  fs.mkdir(dir1800, err => {
//      console.log(err)
//  })

// наповнюємо папку 1800 різними файлами
// fs.writeFile(path.join(__dirname, '1800', 'Oleg.txt'),
//     '{"gender": "male"}',
//     err => {
//     console.log(err)
//     }
//     )
//
// fs.writeFile(path.join(__dirname, '1800', 'Roksa.txt'),
//     '{"gender": "female"}',
//     err => {
//         console.log(err)
//     }
// )
//
// fs.writeFile(path.join(__dirname, '1800', 'Vitya.txt'),
//     '{"gender": "male"}',
//     err => {
//         console.log(err)
//     }
// )

// створюємо папку 2000
// fs.mkdir(dir2000, err => {
//     console.log(err)
// })

// наповнюємо папку 2000 різними файлами
// fs.writeFile(path.join(__dirname, '2000', 'Olya.txt'),
//     '{"gender": "female"}',
//     err => {
//     console.log(err)
//     }
//     )
//
// fs.writeFile(path.join(__dirname, '2000', 'Roman.txt'),
//     '{"gender": "male"}',
//     err => {
//         console.log(err)
//     }
// )
//
// fs.writeFile(path.join(__dirname, '2000', 'Vasylivna.txt'),
//     '{"gender": "female"}',
//     err => {
//         console.log(err)
//     }
// )
//

/* створюємо ф-цію в якій методом readdir отримуємо масив назв файлів,
 перебираємо масивом forEach отримуємо назву з нею через метод readFile доступаємось до кожного
 файла
 */
function searchFile(pathToDir) {
    fs.readdir(pathToDir, (err, files) => {
        files.forEach(file => {
            fs.readFile(path.join(pathToDir, file), (err1, data) => {
                if (err1) throw new Error(err1)
                let person = JSON.parse(data)
                renameFunc(person.gender, pathToDir, file);
            })
        })
    })
}

/* у ф-ції перевіряємо чи виконується умова
і методом rename переносимо файли
 */
function renameFunc(gender, pathDir, nameDoc) {
    let years = '';
    (gender === 'male') ? years = '2000' : years = '1800'
    fs.rename(
        path.join(pathDir, nameDoc),
        path.join(__dirname, years, nameDoc),
        err => {
            console.log(err)
        }
    )
}

searchFile(dir1800);
searchFile(dir2000);

