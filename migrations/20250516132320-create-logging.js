const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logging', {
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
        field: 'organisation'
      },
      timestamp: {
        type: DataTypes.DATE,
        field: 'timestamp',
        defaultValue: Sequelize.fn('GETDATE')
      },
      loglevel: {
        type: DataTypes.STRING(25),
        field: 'loglevel'
      },
      logtext: {
        type: DataTypes.TEXT,
        field: 'logtext'
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
    await queryInterface.dropTable('logging');
  },
};