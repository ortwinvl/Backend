import type { Sequelize, Model } from 'sequelize'
import { Member } from './Member'
import { Enum } from './Enum'
import { Ride } from './Ride'
import { Result } from './Result'
import { Organisation } from './Organisation'
import { Setting } from './Setting'
import { Logging } from './Logging'

export {
  Member,
  Enum,
  Ride,
  Result,
  Organisation,
  Setting,
  Logging
}

export function initModels(sequelize: Sequelize) {
  Member.initModel(sequelize)
  Enum.initModel(sequelize)
  Ride.initModel(sequelize)
  Result.initModel(sequelize)
  Organisation.initModel(sequelize)
  Setting.initModel(sequelize)
  Logging.initModel(sequelize)

  Member.belongsTo(Enum, {
    as: 'classificationid',
    foreignKey: 'classification'
  })
  Member.belongsTo(Enum, {
    as: 'languageid',
    foreignKey: 'language'
  })
  Member.belongsTo(Organisation, {
    as: 'organisationid',
    foreignKey: 'organisation'
  })
  Enum.belongsTo(Organisation, {
    as: 'organisationid',
    foreignKey: 'organisation'
  })
  Ride.belongsTo(Enum, {
    as: 'classificationid',
    foreignKey: 'classification'
  })
  Ride.belongsTo(Member, {
    as: 'leaderid',
    foreignKey: 'leader'
  })
  Ride.belongsTo(Organisation, {
    as: 'organisationid',
    foreignKey: 'organisation'
  })
  Result.belongsTo(Member, {
    as: 'member',
    foreignKey: 'member_id'
  })
  Result.belongsTo(Ride, {
    as: 'ride',
    foreignKey: 'ride_id'
  })
  Setting.belongsTo(Organisation, {
    as: 'organisationid',
    foreignKey: 'organisation'
  })
  Logging.belongsTo(Organisation, {
    as: 'organisationid',
    foreignKey: 'organisation'
  })

  return {
    Member,
    Enum,
    Ride,
    Result,
    Organisation,
    Setting,
    Logging
  }
}
