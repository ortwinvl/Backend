const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enum', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      value: {
        type: DataTypes.STRING(50),
        field: 'value',
        allowNull: false
      },
      organisation: {
        type: DataTypes.UUID,
        field: 'organisation',
        allowNull: false
      },
      enum: {
        type: DataTypes.STRING,
        field: 'enum',
        allowNull: false
      },
      fixed: {
        type: DataTypes.SMALLINT,
        field: 'fixed',
        allowNull: false,
        defaultValue: 0
      },
      pseudodeleted: {
        type: DataTypes.SMALLINT,
        field: 'pseudodeleted',
        defaultValue: 0
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
    await queryInterface.dropTable('enum');
  },
};