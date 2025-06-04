import {
  Association,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize
} from 'sequelize'
import type { Organisation } from './Organisation'

type LoggingAssociations = 'organisationid'

export class Logging extends Model<
  InferAttributes<Logging, {omit: LoggingAssociations}>,
  InferCreationAttributes<Logging, {omit: LoggingAssociations}>
> {
  declare id: CreationOptional<number>
  declare organisation: string | null
  declare timestamp: Date | null
  declare loglevel: string | null
  declare logtext: string | null
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>

  // Logging belongsTo Organisation (as Organisationid)
  declare organisationid?: NonAttribute<Organisation>
  declare getOrganisationid: BelongsToGetAssociationMixin<Organisation>
  declare setOrganisationid: BelongsToSetAssociationMixin<Organisation, string>
  declare createOrganisationid: BelongsToCreateAssociationMixin<Organisation>
  
  declare static associations: {
    organisationid: Association<Logging, Organisation>
  }

  static initModel(sequelize: Sequelize): typeof Logging {
    Logging.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      organisation: {
        type: DataTypes.UUID
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      loglevel: {
        type: DataTypes.STRING(25)
      },
      logtext: {
        type: DataTypes.TEXT
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      sequelize,
      tableName: 'logging'
    })
    
    return Logging
  }
}
