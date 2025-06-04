const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('setting', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      organisation: {
        type: DataTypes.UUID,
        field: 'organisation',
        allowNull: false
      },
      settinggroup: {
        type: DataTypes.STRING,
        field: 'settinggroup',
        allowNull: false
      },
      settingname: {
        type: DataTypes.STRING,
        field: 'settingname',
        allowNull: false
      },
      settingvalue: {
        type: DataTypes.STRING,
        field: 'settingvalue'
      },
      created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('setting');
  },
};