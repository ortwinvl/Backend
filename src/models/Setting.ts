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

type SettingAssociations = 'organisationid'

export class Setting extends Model<
  InferAttributes<Setting, {omit: SettingAssociations}>,
  InferCreationAttributes<Setting, {omit: SettingAssociations}>
> {
  declare id: CreationOptional<number>
  declare organisation: string
  declare settinggroup: string
  declare settingname: string
  declare settingvalue: string | null
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>

  // Setting belongsTo Organisation (as Organisationid)
  declare organisationid?: NonAttribute<Organisation>
  declare getOrganisationid: BelongsToGetAssociationMixin<Organisation>
  declare setOrganisationid: BelongsToSetAssociationMixin<Organisation, string>
  declare createOrganisationid: BelongsToCreateAssociationMixin<Organisation>
  
  declare static associations: {
    organisationid: Association<Setting, Organisation>
  }

  static initModel(sequelize: Sequelize): typeof Setting {
    Setting.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      organisation: {
        type: DataTypes.UUID,
        allowNull: false
      },
      settinggroup: {
        type: DataTypes.STRING,
        allowNull: false
      },
      settingname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      settingvalue: {
        type: DataTypes.STRING
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
      tableName: 'setting'
    })
    
    return Setting
  }
}
