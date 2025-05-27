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
import type { Enum } from './Enum'
import type { Member } from './Member'
import type { Organisation } from './Organisation'

type RideAssociations = 'classificationid' | 'leaderid' | 'organisationid'

export class Ride extends Model<
  InferAttributes<Ride, {omit: RideAssociations}>,
  InferCreationAttributes<Ride, {omit: RideAssociations}>
> {
  declare id: CreationOptional<number>
  declare destination: string
  declare leader: number | null
  declare starttime: Date
  declare duration: number
  declare classification: number | null
  declare officialride: number
  declare elevation: number | null
  declare distance: number | null
  declare organisation: string | null
  declare linkfield: string | null
  declare ispublic: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Ride belongsTo Enum (as Classificationid)
  declare classificationid?: NonAttribute<Enum>
  declare getClassificationid: BelongsToGetAssociationMixin<Enum>
  declare setClassificationid: BelongsToSetAssociationMixin<Enum, number>
  declare createClassificationid: BelongsToCreateAssociationMixin<Enum>
  
  // Ride belongsTo Member (as Leaderid)
  declare leaderid?: NonAttribute<Member>
  declare getLeaderid: BelongsToGetAssociationMixin<Member>
  declare setLeaderid: BelongsToSetAssociationMixin<Member, number>
  declare createLeaderid: BelongsToCreateAssociationMixin<Member>
  
  // Ride belongsTo Organisation (as Organisationid)
  declare organisationid?: NonAttribute<Organisation>
  declare getOrganisationid: BelongsToGetAssociationMixin<Organisation>
  declare setOrganisationid: BelongsToSetAssociationMixin<Organisation, string>
  declare createOrganisationid: BelongsToCreateAssociationMixin<Organisation>
  
  declare static associations: {
    classificationid: Association<Ride, Enum>,
    leaderid: Association<Ride, Member>,
    organisationid: Association<Ride, Organisation>
  }

  static initModel(sequelize: Sequelize): typeof Ride {
    Ride.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      destination: {
        type: DataTypes.STRING(75),
        allowNull: false
      },
      leader: {
        type: DataTypes.INTEGER
      },
      starttime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30
      },
      classification: {
        type: DataTypes.INTEGER
      },
      officialride: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      elevation: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      distance: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      organisation: {
        type: DataTypes.UUID
      },
      linkfield: {
        type: DataTypes.STRING
      },
      ispublic: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    }, {
      sequelize,
      tableName: 'ride'
    })
    
    return Ride
  }
}
