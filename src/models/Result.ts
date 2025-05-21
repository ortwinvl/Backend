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
  declare rideId: number
  declare memberId: number
  declare id: CreationOptional<number>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

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
      rideId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      memberId: {
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
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'result'
    })
    
    return Result
  }
}
