// const dbmySQL = require('../../database/mySQL');

// module.exports = {
//   findALl: async () => {
//     const [dbResponce] = await dbmySQL.query('SELECT * FROM client') || [];
//
//     return dbResponce;
//   },
//   createClient: (clientObj) => {
//     const {
//       idClient,
//       FirstName,
//       LastName,
//       Education,
//       Passport,
//       City,
//       Age,
//       Department_idDepartment
//     } = clientObj;
//     console.log(clientObj);
//     return dbmySQL.query(`INSERT INTO client (
// idClient,
//  FirstName,
//  LastName,
//   Education,
//    Passport,
//     City,
//      Age,
//       Department_idDepartment)
//  VALUES (
//  '${idClient}',
//   '${FirstName}',
//    '${LastName}',
//     '${Education}',
//      '${Passport}',
//       '${City}',
//        '${Age}',
//         '${Department_idDepartment}')`);
//   }
// };

const dbmySQL = require('../../database/mySQL').getInstance();

module.exports = {
  findALl: () => {
    const Client = dbmySQL.getModel('Client');

    return Client.findAll();
  },
  createClient: (clientObj) => {
    const Client = dbmySQL.getModel('Client');

    return Client.create(clientObj);
  }
};
