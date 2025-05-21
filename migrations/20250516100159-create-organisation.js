const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organisation', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      organisation: {
        type: DataTypes.STRING(75),
        field: 'organisation',
        allowNull: false
      },
      vatnumber: {
        type: DataTypes.STRING,
        field: 'vatnumber'
      },
      active: {
        type: DataTypes.SMALLINT,
        field: 'active',
        allowNull: false,
        defaultValue: 1
      },
      streetandnr: {
        type: DataTypes.STRING,
        field: 'streetandnr'
      },
      contactperson: {
        type: DataTypes.STRING(75),
        field: 'contactperson'
      },
      contactemail: {
        type: DataTypes.STRING(75),
        field: 'contactemail',
        allowNull: false
      },
      contactphone: {
        type: DataTypes.STRING(25),
        field: 'contactphone'
      },
      city: {
        type: DataTypes.STRING,
        field: 'city'
      },
      zipcode: {
        type: DataTypes.STRING,
        field: 'zipcode'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organisation');
  },
};