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
import type { Member } from './Member'
import type { Ride } from './Ride'

type ResultAssociations = 'member' | 'ride'

export class Result extends Model<
  InferAttributes<Result, {omit: ResultAssociations}>,
  InferCreationAttributes<Result, {omit: ResultAssociations}>
> {
  declare ride_id: number
  declare member_id: number
  declare id: CreationOptional<number>
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>

  // Result belongsTo Member (as Member)
  declare member?: NonAttribute<Member>
  declare getMember: BelongsToGetAssociationMixin<Member>
  declare setMember: BelongsToSetAssociationMixin<Member, number>
  declare createMember: BelongsToCreateAssociationMixin<Member>
  
  // Result belongsTo Ride (as Ride)
  declare ride?: NonAttribute<Ride>
  declare getRide: BelongsToGetAssociationMixin<Ride>
  declare setRide: BelongsToSetAssociationMixin<Ride, number>
  declare createRide: BelongsToCreateAssociationMixin<Ride>
  
  declare static associations: {
    member: Association<Result, Member>,
    ride: Association<Result, Ride>
  }

  static initModel(sequelize: Sequelize): typeof Result {
    Result.init({
      ride_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
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
      tableName: 'result'
    })
    
    return Result
  }
}
