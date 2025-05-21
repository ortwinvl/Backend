import { IReturnType } from "interfaces";

export interface IMemberRepository {
    // listAllMembers for one organisation function
    listAllMembers(organisationid): Promise<IReturnType>

    // Find a Member by email
    findOneMemberByEmail(MemberEmail: string) : Promise<IReturnType> 

    // Find a Member by id
    findOneMemberById(organisationid, memberId: number) : Promise<IReturnType> 

    // createNewMember function - To create a new Member
    createNewMember(newMemberData) : Promise<IReturnType> 

    // createNewMemberWithOrganisation function - To create new Member
    createNewMemberWithOrganisation( newMemberData, newOrganisationData,) : Promise<IReturnType> 

    // updateMember function - To update a Member
    updateMember(updatedMember) : Promise<IReturnType>

    // delete multiple Members
    deleteMember(member): Promise<IReturnType> 

    //loginMember(email: string, pwd: string) : Promise<IReturnType> 

    //forgetpassword(email: string) : Promise<IReturnType> 

    //confirmLogin(mfa: string, Memberid: number) : Promise<IReturnType> 

    //resetpassword(resetlink: string, pwd: string ) : Promise<IReturnType> 
    
    //loginMemberAfterConfirm(email: string) : Promise<IReturnType> 

    getMFAData(MemberId): Promise<IReturnType>

}
