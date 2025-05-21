import { IReturnType } from "interfaces";
import { Enum } from "models";

export interface IBackOfficeRepository {
    // listAllEnumerations
    listEnumValues( organisationid ): Promise<IReturnType>

    // listAllEnumerations for one Enum type
    listEnumValuesForType( organisationid, enumtype: string): Promise<IReturnType>

    findOneEnumValueById(organisationid, enumvalueId: number) : Promise<IReturnType>
    
    // createNewEnumValue function - To create new EnumValue
    createNewEnumValue( newEnumData ) : Promise<IReturnType>

    updateEnumValue(updatedEnumValue) : Promise<IReturnType>

    deleteEnumValue(enumvalue: Enum): Promise<IReturnType>
}