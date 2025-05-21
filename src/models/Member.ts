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
import type { Organisation } from './Organisation'

type MemberAssociations = 'classificationid' | 'languageid' | 'organisationid'

export class Member extends Model<
  InferAttributes<Member, {omit: MemberAssociations}>,
  InferCreationAttributes<Member, {omit: MemberAssociations}>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare classification: number | null
  declare firstname: string | null
  declare email: string
  declare isactive: number
  declare organisation: string
  declare streetandnr: string | null
  declare zipcode: string | null
  declare city: string | null
  declare mobile: string | null
  declare isadmin: number
  declare mfa: string | null
  declare mfadate: Date | null
  declare resetlink: string | null
  declare resetlinktimestamp: Date | null
  declare birthdate: Date | null
  declare membersince: Date | null
  declare language: number | null
  declare password: string | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  // Member belongsTo Enum (as Classificationid)
  declare classificationid?: NonAttribute<Enum>
  declare getClassificationid: BelongsToGetAssociationMixin<Enum>
  declare setClassificationid: BelongsToSetAssociationMixin<Enum, number>
  declare createClassificationid: BelongsToCreateAssociationMixin<Enum>
  
  // Member belongsTo Enum (as Languageid)
  declare languageid?: NonAttribute<Enum>
  declare getLanguageid: BelongsToGetAssociationMixin<Enum>
  declare setLanguageid: BelongsToSetAssociationMixin<Enum, number>
  declare createLanguageid: BelongsToCreateAssociationMixin<Enum>
  
  // Member belongsTo Organisation (as Organisationid)
  declare organisationid?: NonAttribute<Organisation>
  declare getOrganisationid: BelongsToGetAssociationMixin<Organisation>
  declare setOrganisationid: BelongsToSetAssociationMixin<Organisation, string>
  declare createOrganisationid: BelongsToCreateAssociationMixin<Organisation>
  
  declare static associations: {
    classificationid: Association<Member, Enum>,
    languageid: Association<Member, Enum>,
    organisationid: Association<Member, Organisation>
  }

  static initModel(sequelize: Sequelize): typeof Member {
    Member.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      classification: {
        type: DataTypes.INTEGER
      },
      firstname: {
        type: DataTypes.STRING(50)
      },
      email: {
        type: DataTypes.STRING(75),
        allowNull: false
      },
      isactive: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      organisation: {
        type: DataTypes.UUID,
        allowNull: false
      },
      streetandnr: {
        type: DataTypes.STRING
      },
      zipcode: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.STRING
      },
      isadmin: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
      },
      mfa: {
        type: DataTypes.STRING
      },
      mfadate: {
        type: DataTypes.DATE
      },
      resetlink: {
        type: DataTypes.STRING
      },
      resetlinktimestamp: {
        type: DataTypes.DATE
      },
      birthdate: {
        type: DataTypes.DATE
      },
      membersince: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      language: {
        type: DataTypes.INTEGER
      },
      password: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'member'
    })
    
    return Member
  }
}
