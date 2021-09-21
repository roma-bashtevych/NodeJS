// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//   user: 'root',
//   password: 'root',
//   database: 'bank',
//   host: 'localhost'
// });
//
// module.exports = connection.promise();
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = (() => {
  let instance;

  const initConnection = () => {
    const client = new Sequelize('bank', 'root', 'root', { dialect: 'mysql' });

    const models = {};
    const modelsPath = path.join(process.cwd(), 'database', 'mySQL', 'models');

    const getModels = () => {
      fs.readdir(modelsPath, (err, files) => {
        files.forEach((file) => {
          const [model] = file.split('.');

          // eslint-disable-next-line import/no-dynamic-require
          const modelFile = require(path.join(modelsPath, model));

          models[model] = modelFile(client);
        });
      });
    };

    return {
      setModels: () => getModels(),
      getModel: (modelName) => models[modelName]
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = initConnection();
      }
      return instance;
    }
  };
})();
