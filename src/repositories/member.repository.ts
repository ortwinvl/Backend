/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member } from "../models"
import db from '../db'
import { QueryTypes } from "sequelize";
import { IReturnType, ILogger, TokenData, IMember } from '../interfaces';
import _ from "lodash";
import { Inject } from "typedi";
import { IMemberRepository, IOrganisationRepository } from ".";

class MemberRepository implements IMemberRepository{
    @Inject("logger") protected logger: ILogger;
    @Inject("organisationrepository") protected organisationrepository: IOrganisationRepository;

    // listAllMembers for one organisation function
    public async listAllMembers(organisationid): Promise<IReturnType> {
        const Members =  await Member.findAll({ where: { organisation: organisationid }, 
                                                attributes: { exclude: ['password', 'mfa', 'mfadate', 'active'] },
                                                include: 'languageid'})
            .then((result) => { return { result: 1, data: result };},
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return Members;
    }

    // Find a Member by email
    public async findOneMemberByEmail(MemberEmail: string) : Promise<IReturnType> {
        const member = await Member.findOne({ where: {
            email: MemberEmail
        }})
            .then((result) => {
                if (result === null ) {
                    return { result: -1, error: "Member Not Found" }
                }
                return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err.message, null);
                    return { result: -1, error: err.message }
                }
            )

        if (member && member.result == 1) {
            return member;
        }
        else {
            return { result: -1, error: "Member Not Found" }
        }
    }

    // Find a Member by id
    public async findOneMemberById(organisationid, memberId: number) : Promise<IReturnType> {
        const member = await Member.findOne({ where: {
            organisation: organisationid,
            id: memberId
        }})
            .then((result) => { return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )

        if (member && member.result == 1) {
            return member;
        }
        else {
            return { result: -1, error: "Member not found" }
        }
    }

    // createNewMember function - To create a new Member
    public async createNewMember(newMemberData) : Promise<IReturnType> {
        const l = await Member.create(newMemberData)
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err.message, newMemberData.organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return l;
    }

    // createNewMemberWithOrganisation function - To create new Member
    public async createNewMemberWithOrganisation( newMemberData, newOrganisationData,) : Promise<IReturnType> {
        //Create organisation
        //const orgRepository = new OrganisationRepository(this.logger);
        const org = await this.organisationrepository.createNewOrganisation(newOrganisationData);

        //console.log(JSON.stringify(org));
        
        //const orgService = new OrganisationService(orgRepository);
        //const org = await orgService.CreateOrganisation(newOrganisationData, newlocationData)
        if (org.result != 1) return org
        //Create user
        const u = await this.createNewMember(newMemberData)

        //console.log(JSON.stringify(u));
        if (u.result != 1) return u

            // .then(async (result) => {
            //     // await db.query(`insert into [setting] (organisation, settinggroup, settingname)
            //     // Select distinct :organisation, settinggroup, settingname from [setting]`,
            //     // {
            //     //     type: QueryTypes.INSERT,
            //     //     replacements: { 'organisation' : org.data.id }
            //     // });
            //     // await db.query(`Update [location]
            //     //             set location.organisation = o.id
            //     //             from [organisation] o join [location] l on (l.id = o.address and l.organisation is null )`,
            //     // {
            //     //     type: QueryTypes.UPDATE,
            //     // });
            //     return { result: 1, data: result };
            // },
            //     (err) => {
            //         this.logger.error(err.message, null);
            //         return { result: -1, error: err.message }
            //     }
            // )

        return org;
    }

    // updateMember function - To update a Member
    public async updateMember(updatedMember : Member) : Promise<IReturnType> {
        const savedMember = await updatedMember.save()
            .then((result) => { return { result: 1, data: result }; },
            (err) => {
                this.logger.error(err.message, null);
                return { result: -1, error: err.message }
                }
            )
        return savedMember;
    }

    // delete Member
    public async deleteMember(member: Member): Promise<IReturnType> {
        try {
            const deletedmember = await member.destroy()
                .then((result) => { return { result: 1, data: result };},
                    (err) => {
                        this.logger.error(err.message, member.organisationid);
                        return { result: -1, error: err.message }
                    }
                )
            return deletedmember;
            
        } catch (error) {
            this.logger.error(error.message, member.organisationid);
            return { result: -1, error: error.message }   
        }
    }

    //get MFA data for Member
    public async getMFAData(MemberId): Promise<IReturnType> {
        const mfadata =  await db.query(`Select u.mfa, isnull(u.mfadate, Getdate()) as mfadate, isnull(s.settingvalue, '0') as mfadays
                                    from [Member] u left outer join [setting] s on (u.organisation = s.organisation and s.settingname = 'securitymfadays')
                                    where u.id = :Member`,
        {
            type: QueryTypes.SELECT,
            replacements: { 'Member' : MemberId}
        })
        .then((result) => {
            if (result == null) return { result: -1, error: "Member not found" }
            return { result: 1, data: result[0] };
        },
            (err) => {
                this.logger.error(err.message, null);
                return { result: -1, error: err.message }
            }
        )

        if (mfadata && mfadata.result == 1) {
            return mfadata;
        }
        else {
            return { result: -1, error: "Member not found" }
        }
    }
}
export { MemberRepository };