import { Response, NextFunction } from 'express';
import { CreateEnumDto, UpdateEnumDto, RequestWithUser } from '../interfaces';
import _ from "lodash";
import { plainToInstance } from 'class-transformer';
import { IBackOfficeRepository } from 'repositories';
import { Service, Inject } from "typedi";

@Service()
class BackOfficeController {
    
    constructor(@Inject("backofficerepository") protected repository: IBackOfficeRepository ) {
    }

    public listEnumValues = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findAllEnumData = await this.repository.listEnumValues( req.organisationid );
            if (findAllEnumData.result == 1) {
                res.status(200).json(findAllEnumData);
            }
            else
                res.status(500).json(findAllEnumData);

        } catch (error) {
            next(error);
        }
    };

    public listEnumValuesForType = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const enumType: string = req.params.enumtype;
            const findAllEnumData = await this.repository.listEnumValuesForType(req.organisationid, enumType);
            if (findAllEnumData.result == 1) {
                res.status(200).json(findAllEnumData);
            }
            else
                res.status(500).json(findAllEnumData);

        } catch (error) {
            next(error);
        }
    };
    
    public createEnumValue = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const enumvalue = plainToInstance(CreateEnumDto, req.body)
            enumvalue.organisation = req.organisationid;
            if (req.isbackoffice) {
                enumvalue.fixed = 1;
            }

            const u = await this.repository.createNewEnumValue( enumvalue );
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

    public updateEnumValue = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const enumvalueId: number = req.params.id;
            const newenumvalue = plainToInstance(UpdateEnumDto, req.body)

            const oldenumvalue = await this.repository.findOneEnumValueById(req.organisationid, enumvalueId)
            console.log(JSON.stringify(oldenumvalue))
            if (oldenumvalue.result != 1)  {
                res.status(500).json(oldenumvalue);
                return;
            }

            if (oldenumvalue.data.fixed && !req.isbackoffice) {
                res.status(500).json({result: -1, error: "Fixed values can't be updated"})
                return;
            }

            const updatedEnumValue = _.merge(oldenumvalue.data, newenumvalue);

            const u = await this.repository.updateEnumValue(updatedEnumValue);
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

    public deleteEnumValue = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const enumvalueId = req.params.id;

            const enumvalue = await this.repository.findOneEnumValueById(req.organisationid, enumvalueId)

            if (enumvalue.result != 1) {
                res.status(500).json(enumvalue);
                return; 
            }

            if (enumvalue.data.fixed && !req.isbackoffice) {
                res.status(500).json({result: -1, error: "Fixed values can't be deleted"});
                return;
            } 
            
            const u = await this.repository.deleteEnumValue(enumvalue.data);
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

export { BackOfficeController };