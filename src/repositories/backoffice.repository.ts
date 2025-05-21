import { Enum } from "../models";
import { IReturnType, ILogger, IEnum } from '../interfaces';
import { IBackOfficeRepository } from ".";
import _ from "lodash";
import { Inject } from "typedi";
import { Op } from "sequelize";

class BackOfficeRepository implements IBackOfficeRepository{
    @Inject("logger") protected logger: ILogger;

    // listAllEnumerations
    public async listEnumValues( organisationid ): Promise<IReturnType> {
        const enums = await Enum.findAll({where: { [Op.or]: [ { organisation: organisationid }, { fixed: 1} ]}})
                    .then((result) => {
                        return { result: 1, data: result };
                    },
                        (err) => { return { result: -1, error: err.message } }
                    )
        
                if (enums && enums.result == 1) {
                    return enums;
                }
                else {
                    return { result: -1,  error: "Enumerations not found" }
                }
    }

    // listAllEnumerations for one Enum type
    public async listEnumValuesForType( organisationid, enumtype: string): Promise<IReturnType> {
        const enums = await Enum.findAll({where: {  enum : enumtype,
                                                    [Op.or]: [ { organisation: organisationid }, { fixed: 1} ]
                                                 }})
                .then((result) => { return { result: 1, data: result }; },
                    (err) => { return { result: -1, error: err.message } }
                )
    
            if (enums && enums.result == 1) {
                return enums;
            }
            else {
                return { result: -1, error: "Enumerations not found" }
            }
    }
    
    // Find a EnumValue by id
    public async findOneEnumValueById(organisationid, enumvalueId: number) : Promise<IReturnType> {
        const enumvalue = await Enum.findOne({where: {  id : enumvalueId,
                                                        [Op.or]: [ { organisation: organisationid }, { fixed: 1} ]
                                                    }})
            .then((result) => { return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )

        if (enumvalue && enumvalue.result == 1) {
            return enumvalue;
        }
        else {
            return { result: -1, error: "EnumValue not found" }
        }
    }
    
    // createNewEnumValue function - To create new EnumValue
    public async createNewEnumValue( newEnumData : Enum) : Promise<IReturnType> {       
        const l = await Enum.create(newEnumData)
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    return {
                        result: -1,
                        error: err.message
                    }
                }
            )
        return l;
    }

    // updateEnumValue function - To update a EnumValue
    public async updateEnumValue(updatedEnumValue: Enum) : Promise<IReturnType> {
        try {
            const savedEnumValue = await updatedEnumValue.save()
                .then((result) => { return { result: 1, data: result }; },
                (err) => {
                    this.logger.error(err.message, null);
                    return { result: -1, error: err.message }
                    }
                )
            return savedEnumValue;
        } catch (error) {
            this.logger.error('updateEnumValue :' + error, updatedEnumValue.organisationid);
            return { result: -1, error: error }   
        }
    }

    // delete EnumValue
    public async deleteEnumValue(enumvalue: Enum): Promise<IReturnType> {
        try {
            const deletedvalue = await enumvalue.destroy()
                .then((result) => { return { result: 1, data: result };},
                    (err) => {
                        this.logger.error(err.message, enumvalue.organisationid);
                        return { result: -1, error: err.message }
                    }
                )
            return deletedvalue;
            
        } catch (error) {
            this.logger.error('deleteEnumValue :' + error, enumvalue.organisationid);
            return { result: -1, error: error }   
        }
    }
}

export { BackOfficeRepository };