import { CreateRideDto, IReturnType } from "interfaces";
import { Ride } from "models";

export interface IRideRepository {
    // listAllRides for one organisation function
    listAllRides(organisationid: string, queryparams): Promise<IReturnType>

    // Find a Ride by id
    findOneRideById(organisationid: string, rideId: number) : Promise<IReturnType> 

    // createNewRide function - To create a new Ride
    createNewRide(newRideData: CreateRideDto ) : Promise<IReturnType> 

    // updateRide function - To update a Ride
    updateRide(updatedRide: Ride) : Promise<IReturnType>

    // delete multiple Rides
    deleteRide(ride: Ride): Promise<IReturnType> 
}
