import {
  CreationOptional,
  DataTypes,
  InferCreationAttributes,
  InferAttributes,
  Model,
  Sequelize
} from 'sequelize'

export class Organisation extends Model<
  InferAttributes<Organisation>,
  InferCreationAttributes<Organisation>
> {
  declare id: CreationOptional<string>
  declare organisation: string
  declare vatnumber: string | null
  declare organisationtype: number
  declare active: number
  declare streetandnr: string | null
  declare contactperson: string | null
  declare contactemail: string
  declare contactphone: string | null
  declare city: string | null
  declare zipcode: string | null
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
  
  static initModel(sequelize: Sequelize): typeof Organisation {
    Organisation.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      organisation: {
        type: DataTypes.STRING(75),
        allowNull: false
      },
      organisationtype: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      vatnumber: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      streetandnr: {
        type: DataTypes.STRING
      },
      contactperson: {
        type: DataTypes.STRING(75)
      },
      contactemail: {
        type: DataTypes.STRING(75),
        allowNull: false
      },
      contactphone: {
        type: DataTypes.STRING(25)
      },
      city: {
        type: DataTypes.STRING
      },
      zipcode: {
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
      tableName: 'organisation'
    })
    
    return Organisation
  }
}
