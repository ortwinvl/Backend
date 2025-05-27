/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ride } from "../models"
import { IReturnType, ILogger, CreateRideDto } from '../interfaces';
import _ from "lodash";
import Container from "typedi";
import { IRideRepository } from ".";

class RideRepository implements IRideRepository{
    protected logger: ILogger = Container.get('logger');

    //listAllRides for one organisation function
    public async listAllRides(organisationid: string): Promise<IReturnType> {
        const Rides =  await Ride.findAll({ where: { organisation: organisationid }, 
                                                    include: ['classificationid']})
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
        const ride = await Ride.findOne({ where: {
            organisation: organisationid,
            id: rideId
        }})
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