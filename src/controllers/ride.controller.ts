import { Response, NextFunction } from 'express';
import { ILogger, RequestWithUser, UpdateRideDto } from '../interfaces';
import { IRideRepository } from '../repositories';
import { plainToInstance } from 'class-transformer';
import { CreateRideDto } from '../interfaces';
import _ from "lodash";
import { Service, Inject } from "typedi";

@Service()
class RideController {
    constructor(@Inject("riderepository") protected repository: IRideRepository,
                @Inject("logger") protected logger: ILogger) {
    }

    public listAllRides = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const queryparams = req.query;
            const findAllRidesData = await this.repository.listAllRides(req.organisationid, queryparams); //14080ca3-30e5-41d1-834f-80adb723de48
            if (findAllRidesData.result == 1) {
                res.status(200).json(findAllRidesData);
            }
            else
                res.status(500).json(findAllRidesData);

        } catch (error) {
            next(error);
        }
    };

    public getOneRideById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const rideId = req.params.id;

            const findoneRideData = await this.repository.findOneRideById(req.organisationid, rideId);
            if (findoneRideData.result == 1) {
                res.status(200).json(findoneRideData);
            }
            else
                res.status(500).json(findoneRideData);

        } catch (error) {
            next(error);
        }
    };

    public createRide = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const ride = plainToInstance(CreateRideDto, req.body)
            ride.organisation = req.organisationid;
            
            const u = await this.repository.createNewRide( ride);
            if (u.result == 1) res.status(200).json(u);
            else res.status(500).json(u);
        } catch (error) {
            next(error);
        }
    };

    public updateRide = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const rideId: number = req.params.id;
            const newride = plainToInstance(UpdateRideDto, req.body)

            const oldride = await this.repository.findOneRideById( req.organisationid, rideId )

            if (oldride.result != 1)  {
                res.status(500).json(oldride);
                return
            } 
            
            const updatedRide = _.merge(oldride.data, newride);

            const u = await this.repository.updateRide(updatedRide);
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

    public deleteRide = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const rideId = req.params.id;

            const oldride = await this.repository.findOneRideById( req.organisationid, rideId )

            if (oldride.result != 1)  {
                res.status(500).json(oldride);
                return
            } 
            
            const u = await this.repository.deleteRide(oldride.data);
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

export { RideController };