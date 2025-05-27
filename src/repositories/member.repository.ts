/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member } from "../models"
import db from '../db'
import { QueryTypes } from "sequelize";
import { IReturnType, ILogger } from '../interfaces';
import _ from "lodash";
import Container from "typedi";
import { IMemberRepository, IOrganisationRepository } from ".";

class MemberRepository implements IMemberRepository{
    protected orgRepository : IOrganisationRepository = Container.get('organisationrepository');
    protected logger: ILogger = Container.get('logger');

    // listAllMembers for one organisation function
    public async listAllMembers(organisationid): Promise<IReturnType> {
        const Members =  await Member.findAll({ where: { organisation: organisationid }, 
                                                attributes: { exclude: ['password', 'mfa', 'mfadate', 'active'] },
                                                include: ['languageid', 'classificationid']})
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
        const member = await Member.findOne({ where: { email: MemberEmail },
                                              include: ['languageid', 'organisationid']
                                            })
            .then((result) => { return (result === null ? { result: -1, data: "Member not found" } : { result: 1, data: result });
            },
                (err) => {
                    this.logger.error(err.message, null);
                    return { result: -1, error: err.message }
                }
            )
        return member;
    }

    // Find a Member by id
    public async findOneMemberById(organisationid, memberId: number) : Promise<IReturnType> {
        const member = await Member.findOne({ where: { organisation: organisationid, id: memberId },
                                              attributes: { exclude: ['password', 'mfa', 'mfadate', 'active'] },
                                              include: ['languageid', 'classificationid']
                                            })
            .then((result) => { return (result === null ? { result: -1, data: "Member not found" } : { result: 1, data: result });
            },
                (err) => {
                    this.logger.error(err.message, organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return member;
    }

    // createNewMember function - To create a new Member
    public async createNewMember(newMemberData) : Promise<IReturnType> {
        const l = await Member.create(newMemberData)
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    this.logger.error(err, newMemberData.organisationid);
                    return { result: -1, error: err.message }
                }
            )
        return l;
    }

    // createNewMemberWithOrganisation function - To create new Member
    public async createNewMemberWithOrganisation( newMemberData, newOrganisationData,) : Promise<IReturnType> {
        //Create organisation
        const org = await this.orgRepository.createNewOrganisation(newOrganisationData);
        if (org.result != 1) return org

        //Create user
        newMemberData.organisation = org.data.id;
        const u = await this.createNewMember(newMemberData)
        if (u.result != 1) return u

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