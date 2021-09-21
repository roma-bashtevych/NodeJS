const { DataTypes } = require('sequelize');

module.exports = (client) => {
  const Client = client.define(
    'Client',
    {
      idClient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FirstName: {
        type: DataTypes.STRING
      },
      LastName: {
        type: DataTypes.STRING
      },
      Education: {
        type: DataTypes.STRING
      },
      Passport: {
        type: DataTypes.STRING
      },
      City: {
        type: DataTypes.STRING
      },
      Age: {
        type: DataTypes.INTEGER
      },
      Department_idDepartment: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'client',
      timestamps: false
    }
  );

  return Client;
};
