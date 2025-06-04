/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from "../models"
import { IReturnType, ILogger, CreateResultDto } from '../interfaces';
import _ from "lodash";
import { QueryTypes } from "sequelize";
import Container from "typedi";
import { IResultRepository } from ".";
import db from "db";

class ResultRepository implements IResultRepository{
    protected logger: ILogger = Container.get('logger');

    //listAllResults for one organisation function
    public async listAllResults(organisationid, queryparams): Promise<IReturnType> {
        let datefrom = new Date("2025-01-01");
        let dateto = new Date("2225-01-01");
        let rideid = -1;
        let memberid = -1;
        let organisation = "all";
        
        if (queryparams) {
            if (queryparams.datefrom) datefrom = new Date(queryparams.datefrom);
            if (queryparams.dateto) dateto = new Date(queryparams.dateto);
            if (queryparams.rideid) rideid = queryparams.rideid;
            if (queryparams.memberid) memberid = queryparams.memberid;
            if (queryparams.organisation) organisation = organisationid;
        }

        const Results = await db.query(`Select r.id [resultid] 
                                                ,ride_id [rideid]
                                                ,member_id [memberid]
                                                ,m.[name]
                                                ,m.[firstname]
                                                ,mc.id [memberclassificationid]
                                                ,mc.value [memberclassification]
                                                ,cl.id [classificationid]
                                                ,cl.value [classification]
                                                ,ri.[destination]
                                                ,ri.[distance]
                                                ,ri.[starttime]
                                                ,ri.[officialride]
                                            from [dbo].[result] r
                                            inner join [dbo].[member] m on r.member_id = m.id
                                            inner join [dbo].[ride] ri on r.ride_id = ri.id
                                            left outer join [dbo].[enum] cl on ri.classification = cl.id
                                            left outer join [dbo].[enum] mc on m.classification = mc.id
                                            where ri.starttime between :datefrom and :dateto
                                            and ( ri.id = :rideid or :rideid = -1 )
                                            and ( m.id = :memberid or :memberid  = -1 ) 
                                            and ( ri.organisation = :organisation or :organisation = 'all' )`,
        {
            type: QueryTypes.SELECT,
            nest: true,
            replacements: { 'organisation' : organisation, 'rideid': rideid, 'memberid': memberid, 'datefrom': datefrom, 'dateto': dateto}
        })
        .then((result) => { return { result: 1, data: result };},
                (err) => {
                    this.logger.error('listAllResults: ' + err, organisationid);
                    return { result: -1, error: err }
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