const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ride', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      destination: {
        type: DataTypes.STRING(75),
        field: 'destination',
        allowNull: false
      },
      leader: {
        type: DataTypes.INTEGER,
        field: 'leader'
      },
      starttime: {
        type: DataTypes.DATE,
        field: 'starttime',
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        field: 'duration',
        default: 30
      },
      classification: {
        type: DataTypes.INTEGER,
        field: 'classification'
      },
      officialride: {
        type: DataTypes.SMALLINT,
        field: 'officialride',
        allowNull: false,
        defaultValue: 1
      },
      elevation: {
        type: DataTypes.DOUBLE,
        field: 'elevation',
        defaultValue: 0
      },
      distance: {
        type: DataTypes.DOUBLE,
        field: 'distance',
        defaultValue: 0
      },
      organisation: {
        type: DataTypes.UUID,
        field: 'organisation'
      },
      linkfield: {
        type: DataTypes.STRING,
        field: 'linkfield'
      },
      ispublic: {
        type: DataTypes.SMALLINT,
        field: 'ispublic',
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('ride');
  },
};