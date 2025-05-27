import { Response, NextFunction } from 'express';
import { ILogger, RequestWithUser } from '../interfaces';
import { IResultRepository } from '../repositories';
import { plainToInstance } from 'class-transformer';
import { CreateResultDto } from '../interfaces';
import _ from "lodash";
import { Service, Inject } from "typedi";

@Service()
class ResultController {
    constructor(@Inject("resultrepository") protected repository: IResultRepository,
                @Inject("logger") protected logger: ILogger) {
    }

    public listAllResults = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findAllResultsData = await this.repository.listAllResults(req.organisationid); //14080ca3-30e5-41d1-834f-80adb723de48
            if (findAllResultsData.result == 1) {
                res.status(200).json(findAllResultsData);
            }
            else
                res.status(500).json(findAllResultsData);

        } catch (error) {
            next(error);
        }
    };

    public getOneResultById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const resultId = req.params.id;

            const findoneResultData = await this.repository.findOneResultById(resultId);
            if (findoneResultData.result == 1) {
                res.status(200).json(findoneResultData);
            }
            else
                res.status(500).json(findoneResultData);

        } catch (error) {
            next(error);
        }
    };

    public createResult = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const result = plainToInstance(CreateResultDto, req.body)
            
            const u = await this.repository.createNewResult( result);
            if (u.result == 1) res.status(200).json(u);
            else res.status(500).json(u);
        } catch (error) {
            next(error);
        }
    };

    public deleteResult = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const resultId = req.params.id;

            const oldresult = await this.repository.findOneResultById( resultId )

            if (oldresult.result != 1)  {
                res.status(500).json(oldresult);
                return
            } 
            
            const u = await this.repository.deleteResult(oldresult.data);
            if (u.result == 1) {
                res.status(200).json(u);
            }
            else {
                res.status(500).json(u);
            }
        } catch (error) {
            next(error);
        }
    };
}

export { ResultController };