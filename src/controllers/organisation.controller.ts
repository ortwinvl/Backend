import { Request, Response, NextFunction } from 'express';
import { IMemberRepository, IOrganisationRepository } from '../repositories'; //, MailRepository
import { plainToInstance } from 'class-transformer';
import { RequestWithUser, CreateUpdateOrganisationDto, CreateMemberDto, UpdateMemberDto } from '../interfaces';
//import OrganisationService from '../services/organisation.service';
//import { MailController } from './index';
import { Service, Inject } from "typedi";
import { MemberService } from '../services';

@Service()
class OrganisationController {
    
    constructor(@Inject("organisationrepository") protected repository: IOrganisationRepository,
                @Inject("memberrepository") protected memberrepository: IMemberRepository,
                @Inject() protected memberservice: MemberService) {
    }

    public listAllOrganisations = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findAllOrganisationsData = await this.repository.listAllOrganisations(req.organisationid);
            if (findAllOrganisationsData.result == 1) {
                res.status(200).json(findAllOrganisationsData);
            }
            else
                res.status(500).json(findAllOrganisationsData);

        } catch (error) {
            next(error);
        }
    };

    public getOneOrganisationById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findoneOrganisationData = await this.repository.findOneOrganisationById(req.organisationid);
            if (findoneOrganisationData.result == 1) {
                res.status(200).json(findoneOrganisationData);
                return;
            }
            else {
                res.status(500).json(findoneOrganisationData);
                return;
            }
        } catch (error) {
            next(error);
        }
    };

    public createNewOrganisation = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const callback = req.body.callback;
            const org = plainToInstance(CreateUpdateOrganisationDto, req.body, { excludeExtraneousValues: true });
            const user = plainToInstance(CreateMemberDto, req.body, { excludeExtraneousValues: true });

            const pwd = this.memberservice.generateHashedpassword(req.body.password);
            user.password = pwd
            user.isadmin = 1;
            org.contactemail = user.email;
            org.contactperson = user.name + " " + user.firstname;
            org.isactive = 1;
            const neworg = await this.memberrepository.createNewMemberWithOrganisation( user, org );
            if (neworg.result != 1) {
                res.status(401).json(neworg);
                return;
            }
            res.status(200).json(neworg);

            // //Organisation is created => send confirmation mail
            // const mailrepository = new MailRepository();
            // const mailcontroller = new MailController( mailrepository );
            // const mail = {
            //     organisation: neworg.data.id,
            //     from: "info@acsis.be",
            //     to: user.email,
            //     subject: "Welcome",
            //     body: `<h3>Welcome to the free online ARM solutions by Acsis</h3>
            //     <p><strong>Click on the link below to confirm the registration of: ${org.organisation} </strong></p>
                
            //      <br/>
            //      <br/>
                
            //     <a clicktracking="off" href="${callback}${neworg.data.id}">Confirm</a>`,
            // };
            // const r = await mailcontroller.sendRegisterMail(neworg.data.id, mail);
            // if (r.result == 1) {
            //     res.status(200).json(r);
            // }
            // else
            // res.status(403).json(r);
        
        } catch (error) {
            next(error);
        }
    }

    public confirmNewOrganisation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const organisationid = req.params.id;
            const org = await this.repository.findOneOrganisationById(organisationid);
            if (org.result != 1) {
                res.status(401).json(org);
                return;
            }
            if (org.data.active === 1) {
                const result =  { result: -1, error: "Organisation already confirmed" };
                res.status(401).json(result);
                return;
            }

            const updatedorg = { active: 1 };
            const r = await this.repository.updateOrganisation(organisationid, updatedorg);
            //console.log("confirmNewOrganisation")
            if (r.result == 1) {
                // //Initialize the organisation
                // const service = new OrganisationService(this.repository);
                // await service.InitialiseOrganisation(organisationid);

                res.status(200).json(r);
            }
            else
                res.status(401).json(r);
        } catch (error) {
            next(error);
        }
    }

    public updateOrganisation = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const org = plainToInstance(UpdateMemberDto, req.body, { excludeExtraneousValues: true });
            const r = await this.repository.updateOrganisation(req.organisationid, org);
            if (r.result == 1) {
                res.status(200).json(r);
            }
            else
                res.status(500).json(r);
        } catch (error) {
            next(error);
        }
    }

    // public async deleteOrganisation(req: Request, res: Response) {
    //     // var r = await this.organisationRepository.deleteOrganisation(req.params.organisationid);
    //     // if (r.result == 1) {
    //     //     res.status(200).json(r);
    //     // }
    //     // else
    //     //     res.status(500).json(r);
    // }
}

export { OrganisationController };