import { BASEORGANISATION } from '../config';
import { Organisation } from "../models";
import { ILogger, IReturnType } from '../interfaces';
import db from '../db'
import { QueryTypes } from "sequelize";
import _ from "lodash";
import { Service, Inject } from "typedi";
import { IOrganisationRepository } from '.';

@Service()
class OrganisationRepository implements IOrganisationRepository{
    @Inject("logger") protected logger: ILogger;

    // listAllOrganisations function
    public async listAllOrganisations(organisationid) : Promise<IReturnType> {
        //console.log(BASEORGANISATION);
        //const isbackoffice = (role == 100);
        const organisations = await db.query(`SELECT [id]
                                                ,[organisation]
                                                ,[vatnumber]
                                                ,[active]
                                                ,[streetandnr]
                                                ,[city]
                                                ,[zipcode]
                                                ,[contactperson]
                                                ,[contactemail]
                                                ,[contactphone]
                                            FROM [organisation] o
                                            Where o.id = :organisationid`,
        {
            type: QueryTypes.SELECT,
            replacements: { 'organisationid' : organisationid}
        })
            .then((result) => { return { result: 1, data: result }; },
                (err) => { return { result: -1, error: err.message } }
            )
        return organisations;
    }

    // Find an Organisation by id
    public async findOneOrganisationById(organisationid) : Promise<IReturnType> {
        const organisation = await Organisation.findOne({where: {
                    id: organisationid
                }})
                    .then((result) => {
                        return {
                            result: 1, data: result
                        };
                    },
                        (err) => {
                            return {
                                result: -1,
                                error: err.message
                            }
                        }
                    )
        
                if (organisation && organisation.result == 1) {
                    return organisation;
                }
                else {
                    return {
                        result: -1,
                        error: "Organisation not found"
                    }
                }
    }

    // createNewOrganisation function - To create a new Organisation
    public async createNewOrganisation(newOrganisationData) : Promise<IReturnType> {
        const l = await Organisation.create(newOrganisationData)
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error('createNewOrganisation: ' + err.message, null);
                    return {result: -1, error: err.message }
                }
            )
        return l;
    }

    // updateOrganisation function - To update a Organisation
    public async updateOrganisation(organisationid, organisationData) : Promise<IReturnType> {
        const org = await Organisation.findByPk(organisationid);

        if (!org) {
            return {
                result: -1,
                error: "Organisation not found"
            }
        }
         
        const updatedOrganisation = _.merge(org, organisationData);

        const savedOrganisation = await updatedOrganisation.save()
                .then((result) => {
                    return { result: 1, data: result };
                },
                    (err) => {
                        return {
                            result: -1,
                            error: err.message
                        }
                    }
                )
            return savedOrganisation;
    }

    // deleteOrganisation function - To delete a Organisation
    public async deleteOrganisation(organisationid) : Promise<IReturnType> {
        const org = await Organisation.findByPk(organisationid);

        if (!org) {
            return {
                result: -1,
                error: "Organisation not found"
            }
        }

        const r = await org.destroy()
        .then((result) => {
            return { result: 1, data: result };
        },
            (err) => {
                return {
                    result: -1, error: err.message }
            }
        );

        return r;
    }

    // initialise organisation function
    public async initOrganisation(organisationid) : Promise<IReturnType> {
        //Call SP to copy all settings
        const organisation = await db.query(`EXEC [Organisation.Initialise] :fromorganisation, :toorganisation`,
        {
            replacements: { 'fromorganisation' : BASEORGANISATION, 'toorganisation' : organisationid }
        })
        .then((result) => {
            return { result: 1, data: result };
        },
            (err) => { return { result: -1, error: err.message } }
        );
        //Get documents to copy from container
        if (organisation.result == 1) {
            const docs = await db.query(`Select [name] [copyname] from setting s inner join document d on s.settingvalue = d.folder 
                                        where	s.organisation= :organisation 
                                        and		s.settingname = 'invoicelayoutfolder'`,
            {
                type: QueryTypes.SELECT,
                replacements: {'organisation' : BASEORGANISATION }
            })
            .then((result) => { return { result: 1, data: result };},
            (err) => { return { result: -1, error: err.message } }
            )
            //return documents
            return docs;
        }
        //Return error
        return organisation;
    }
}

export { OrganisationRepository };