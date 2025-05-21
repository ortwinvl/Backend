import { IReturnType } from "interfaces";

export interface IOrganisationRepository{
    // listAllOrganisations function
    listAllOrganisations(organisationid) : Promise<IReturnType>

    // Find an Organisation by id
    findOneOrganisationById(organisationid) : Promise<IReturnType>

    // createNewOrganisation function - To create a new Organisation
    createNewOrganisation(newOrganisationData) : Promise<IReturnType> 

    // updateOrganisation function - To update a Organisation
    updateOrganisation(organisationid, organisationData) : Promise<IReturnType> 

    // deleteOrganisation function - To delete a Organisation
    deleteOrganisation(organisationid) : Promise<IReturnType> 

    // initialise organisation function
    initOrganisation(organisationid) : Promise<IReturnType> 
}