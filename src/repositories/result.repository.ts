/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from "../models"
import { IReturnType, ILogger, CreateResultDto } from '../interfaces';
import _ from "lodash";
import Container from "typedi";
import { IResultRepository } from ".";

class ResultRepository implements IResultRepository{
    protected logger: ILogger = Container.get('logger');

    // { where: { organisation: organisationid }, 
    //                                             attributes: { exclude: ['password', 'mfa', 'mfadate', 'active'] },
    //                                             include: ['classificationid']}
    //listAllResults for one organisation function
    public async listAllResults(organisationid: string): Promise<IReturnType> {
        const Results =  await Result.findAll()
            .then((result) => { return { result: 1, data: result };},
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return Results;
    }

    // Find a Result by id
    public async findOneResultById( resultId: number) : Promise<IReturnType> {
        const result = await Result.findOne({ where: {
            //organisation: organisationid,
            id: resultId
        }})
            .then((result) => { return (result === null ? { result: -1, data: "Result not found" } : { result: 1, data: result });
            },
                (err) => {
                    this.logger.error(err.message, null);
                    return { result: -1, error: err.message }
                }
            )
        return result;
    }

    // createNewResult function - To create a new Result
    public async createNewResult(newResultData: CreateResultDto) : Promise<IReturnType> {
        const l = await Result.create(newResultData)
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err, null);
                    return { result: -1, error: err.message }
                }
            )
        return l;
    }

    // updateResult function - To update a Result
    public async updateResult(updatedResult : Result) : Promise<IReturnType> {
        const savedResult = await updatedResult.save()
            .then((result) => { return { result: 1, data: result }; },
            (err) => {
                this.logger.error(err.message, null);
                return { result: -1, error: err.message }
                }
            )
        return savedResult;
    }

    // delete Result
    public async deleteResult(result: Result): Promise<IReturnType> {
        try {
            const deletedresult = await result.destroy()
                .then((result) => { return { result: 1, data: result };},
                    (err) => {
                        this.logger.error(err.message, null);
                        return { result: -1, error: err.message }
                    }
                )
            return deletedresult;
            
        } catch (error) {
            this.logger.error(error.message, null);
            return { result: -1, error: error.message }   
        }
    }

}
export { ResultRepository };