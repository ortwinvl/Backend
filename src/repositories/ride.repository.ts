/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ride } from "../models"
import { IReturnType, ILogger, CreateRideDto } from '../interfaces';
import _ from "lodash";
import Container from "typedi";
import { IRideRepository } from ".";
import { Op, QueryTypes } from "sequelize";
import db from "db";
import { bool } from "../utils/util";

class RideRepository implements IRideRepository{
    protected logger: ILogger = Container.get('logger');

    //list All Rides for one organisation function
    public async listAllRides(organisationid: string, queryparams): Promise<IReturnType> {
        let ownride = 1;
        if (queryparams) {
            if (queryparams.ownridesonly) ownride = bool(queryparams.ownridesonly) ? 1 : 0;
        }
        
        const Rides = await db.query(` SELECT [Ride].[id] 
                                            ,[Ride].[destination]
                                            ,[Ride].[leader]
                                            ,[Ride].[starttime]
                                            ,[Ride].[duration] 
                                            ,[Ride].[classification]
                                            ,[Ride].[officialride]
                                            ,[Ride].[elevation]
                                            ,[Ride].[distance] 
                                            ,[Ride].[organisation]
                                            ,[Ride].[linkfield]
                                            ,[Ride].[ispublic]  
                                            ,[classificationid].[id] AS [classificationid.id]
                                            ,[classificationid].[value] AS [classificationid.value]
                                            ,(Case when [Ride].[organisation] = :organisation then 1 else 0 end ) [ownride]
                                            FROM [ride] AS [Ride] LEFT OUTER JOIN [enum] AS [classificationid] ON [Ride].[classification] = [classificationid].[id] 
                                            WHERE ([Ride].[organisation] = :organisation OR ( [Ride].[ispublic] = 1 and :ownride = 0))`,
            {
                type: QueryTypes.SELECT,
                nest: true,
                replacements: { 'organisation' : organisationid, 'ownride': ownride}
            })
            .then((result) => { return { result: 1, data: result };},
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return Rides;
    }

    // Find a Ride by id
    public async findOneRideById(organisationid: string, rideId: number) : Promise<IReturnType> {
        const ride = await Ride.findOne({ where: { organisation: organisationid,id: rideId },
                                                include: ['classificationid']})
            .then((result) => { return (result === null ? { result: -1, data: "Ride not found" } : { result: 1, data: result });
            },
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return ride;
    }

    // createNewRide function - To create a new Ride
    public async createNewRide(newRideData: CreateRideDto) : Promise<IReturnType> {
        const l = await Ride.create(newRideData)
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err, newRideData.organisation);
                    return { result: -1, error: err.message }
                }
            )
        return l;
    }

    // updateRide function - To update a Ride
    public async updateRide(updatedRide : Ride) : Promise<IReturnType> {
        const savedRide = await updatedRide.save()
            .then((result) => { return { result: 1, data: result }; },
            (err) => {
                this.logger.error(err.message, null);
                return { result: -1, error: err.message }
                }
            )
        return savedRide;
    }

    // delete Ride
    public async deleteRide(ride: Ride): Promise<IReturnType> {
        try {
            const deletedride = await ride.destroy()
                .then((result) => { return { result: 1, data: result };},
                    (err) => {
                        this.logger.error(err.message, ride.organisationid);
                        return { result: -1, error: err.message }
                    }
                )
            return deletedride;
            
        } catch (error) {
            this.logger.error(error.message, ride.organisationid);
            return { result: -1, error: error.message }   
        }
    }

}
export { RideRepository };