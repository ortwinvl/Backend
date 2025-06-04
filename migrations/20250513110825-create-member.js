const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('member', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(50),
        field: 'name',
        allowNull: false
      },
      classification: {
        type: DataTypes.INTEGER,
        field: 'classification'
      },
      firstname: {
        type: DataTypes.STRING(50),
        field: 'firstname'
      },
      email: {
        type: DataTypes.STRING(75),
        field: 'email',
        allowNull: false
      },
      isactive: {
        type: DataTypes.SMALLINT,
        field: 'isactive',
        allowNull: false,
        defaultValue: 1
      },
      organisation: {
        type: DataTypes.UUID,
        field: 'organisation',
        allowNull: false
      },
      streetandnr: {
        type: DataTypes.STRING,
        field: 'streetandnr'
      },
      zipcode: {
        type: DataTypes.STRING,
        field: 'zipcode'
      },
      city: {
        type: DataTypes.STRING,
        field: 'city'
      },
      mobile: {
        type: DataTypes.STRING,
        field: 'mobile'
      },
      isadmin: {
        type: DataTypes.SMALLINT,
        field: 'isadmin',
        allowNull: false,
        defaultValue: 0
      },
      mfa: {
        type: DataTypes.STRING,
        field: 'mfa'
      },
      mfadate: {
        type: DataTypes.DATEONLY,
        field: 'mfadate'
      },
      resetlink: {
        type: DataTypes.STRING,
        field: 'resetlink'
      },
      resetlinktimestamp: {
        type: DataTypes.DATEONLY,
        field: 'resetlinktimestamp'
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        field: 'birthdate'
      },
      membersince: {
        type: DataTypes.DATEONLY,
        field: 'membersince',
        defaultValue: Sequelize.fn('GETDATE')
      },
      language: {
        type: DataTypes.INTEGER,
        field: 'language'
      },
      password: {
        type: DataTypes.STRING,
        field: 'password'
      },
      created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      licensenumber: {
        type: DataTypes.STRING(50),
        field: 'licensenumber'
      },
      emergencycontact: {
        type: DataTypes.STRING,
        field: 'emergencycontact'
      },
      emergencycontactphone: {
        type: DataTypes.STRING(50),
        field: 'emergencycontactphone'
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('member');
  },
};