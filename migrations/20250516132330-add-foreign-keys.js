const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('member', {
      fields: ['classification'],
      type: 'foreign key',
      name: 'member_classification_fkey',
      references: {
        table: 'enum',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('member', {
      fields: ['organisation'],
      type: 'foreign key',
      name: 'member_organisation_fkey',
      references: {
        table: 'organisation',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    
    await queryInterface.addConstraint('member', {
      fields: ['language'],
      type: 'foreign key',
      name: 'member_language_fkey',
      references: {
        table: 'enum',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('enum', {
      fields: ['organisation'],
      type: 'foreign key',
      name: 'enum_organisation_fkey',
      references: {
        table: 'organisation',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    
    await queryInterface.addConstraint('ride', {
      fields: ['leader'],
      type: 'foreign key',
      name: 'ride_leader_fkey',
      references: {
        table: 'member',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('ride', {
      fields: ['classification'],
      type: 'foreign key',
      name: 'ride_classification_fkey',
      references: {
        table: 'enum',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('ride', {
      fields: ['organisation'],
      type: 'foreign key',
      name: 'ride_organisation_fkey',
      references: {
        table: 'organisation',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    
    await queryInterface.addConstraint('result', {
      fields: ['ride_id'],
      type: 'foreign key',
      name: 'result_ride_id_fkey',
      references: {
        table: 'ride',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('result', {
      fields: ['member_id'],
      type: 'foreign key',
      name: 'result_member_id_fkey',
      references: {
        table: 'member',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('setting', {
      fields: ['organisation'],
      type: 'foreign key',
      name: 'setting_organisation_fkey',
      references: {
        table: 'organisation',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    
    await queryInterface.addConstraint('logging', {
      fields: ['organisation'],
      type: 'foreign key',
      name: 'logging_organisation_fkey',
      references: {
        table: 'organisation',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('member', 'member_classification_fkey')
    await queryInterface.removeConstraint('member', 'member_organisation_fkey')
    await queryInterface.removeConstraint('member', 'member_language_fkey')
    await queryInterface.removeConstraint('enum', 'enum_organisation_fkey')
    await queryInterface.removeConstraint('ride', 'ride_leader_fkey')
    await queryInterface.removeConstraint('ride', 'ride_classification_fkey')
    await queryInterface.removeConstraint('ride', 'ride_organisation_fkey')
    await queryInterface.removeConstraint('result', 'result_ride_id_fkey')
    await queryInterface.removeConstraint('result', 'result_member_id_fkey')
    await queryInterface.removeConstraint('setting', 'setting_organisation_fkey')
    await queryInterface.removeConstraint('logging', 'logging_organisation_fkey')
  }
};