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

type EnumAssociations = 'organisationid'

export class Enum extends Model<
  InferAttributes<Enum, {omit: EnumAssociations}>,
  InferCreationAttributes<Enum, {omit: EnumAssociations}>
> {
  declare id: CreationOptional<number>
  declare value: string
  declare organisation: string
  declare enum: string
  declare fixed: number
  declare pseudodeleted: number | null
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>

  // Enum belongsTo Organisation (as Organisationid)
  declare organisationid?: NonAttribute<Organisation>
  declare getOrganisationid: BelongsToGetAssociationMixin<Organisation>
  declare setOrganisationid: BelongsToSetAssociationMixin<Organisation, string>
  declare createOrganisationid: BelongsToCreateAssociationMixin<Organisation>
  
  declare static associations: {
    organisationid: Association<Enum, Organisation>
  }

  static initModel(sequelize: Sequelize): typeof Enum {
    Enum.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      value: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      organisation: {
        type: DataTypes.UUID,
        allowNull: false
      },
      enum: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fixed: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      pseudodeleted: {
        type: DataTypes.SMALLINT,
        defaultValue: 0
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
      tableName: 'enum'
    })
    
    return Enum
  }
}
