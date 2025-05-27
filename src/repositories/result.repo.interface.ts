import { CreateResultDto, IReturnType } from "interfaces";
import { Result } from "models";

export interface IResultRepository {
    // listAllResults for one organisation function 
    listAllResults(organisationid: string): Promise<IReturnType>

    // Find a Result by id
    findOneResultById(resultId: number) : Promise<IReturnType> 

    // createNewResult function - To create a new Result
    createNewResult(newResultData: CreateResultDto ) : Promise<IReturnType> 

    // updateResult function - To update a Result
    updateResult(updatedResult: Result) : Promise<IReturnType>

    // delete multiple Results
    deleteResult(result: Result): Promise<IReturnType> 
}
