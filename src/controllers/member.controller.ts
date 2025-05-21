import { Response, NextFunction } from 'express';
import { ILogger, LoginDto, RequestWithUser, UpdateMemberDto } from '../interfaces';
import { IMemberRepository } from '../repositories';
import { plainToInstance } from 'class-transformer';
import { CreateMemberDto } from '../interfaces';
import { MemberService } from 'services';
import _ from "lodash";
import { Service, Inject } from "typedi";
import moment from 'moment';

@Service()
class MemberController {
    constructor(@Inject("memberrepository") protected repository: IMemberRepository,
                @Inject("logger") protected logger: ILogger,
                @Inject() protected memberservice: MemberService) {
    }

    public listAllMembers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findAllMembersData = await this.repository.listAllMembers(req.organisationid); //14080ca3-30e5-41d1-834f-80adb723de48
            if (findAllMembersData.result == 1) {
                res.status(200).json(findAllMembersData);
            }
            else
                res.status(500).json(findAllMembersData);

        } catch (error) {
            next(error);
        }
    };

    public getOneMemberById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;

            const findoneMemberData = await this.repository.findOneMemberById(req.organisationid, userId);
            if (findoneMemberData.result == 1) {
                res.status(200).json(findoneMemberData);
            }
            else
                res.status(500).json(findoneMemberData);

        } catch (error) {
            next(error);
        }
    };

    public createMember = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const member = plainToInstance(CreateMemberDto, req.body)
            const pwd = this.memberservice.generateHashedpassword(member.password);
    
            member.organisation = req.organisationid;
            member.password = pwd;

            const u = await this.repository.createNewMember( member);
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

    public updateMember = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const memberId: number = req.params.id;
            const newmember = plainToInstance(UpdateMemberDto, req.body)

            const oldmember = await this.repository.findOneMemberById( req.organisationid, memberId )

            if (oldmember.result != 1)  {
                res.status(500).json(oldmember);
                return
            } 
            
            const updatedMember = _.merge(oldmember.data, newmember);

            const u = await this.repository.updateMember(updatedMember);
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

    public deleteMember = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const memberId = req.params.id;

            const oldmember = await this.repository.findOneMemberById( req.organisationid, memberId )

            if (oldmember.result != 1)  {
                res.status(500).json(oldmember);
                return
            } 
            
            const u = await this.repository.deleteMember(oldmember);
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

    public deleteMembers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            
            for (const memberid of data.members) {
                const oldmember = await this.repository.findOneMemberById( req.organisationid, memberid )

                if (oldmember.result == 1)  {
                    const u = await this.repository.deleteMember(oldmember);
                    if (u.result != 1) {
                        res.status(500).json(u);
                        return;
                    }
                } 
            }

            res.status(200).json({result: 1, data: data.members.length});
        } catch (error) {
            next(error);
        }
    };

    public loginMember = async (req: RequestWithUser, res: Response) => {
        try {
                //Parse logindata
                const logindata = plainToInstance(LoginDto, req.body)

                //Find member based on email
                const member = await this.repository.findOneMemberByEmail(logindata.email);
                    
                if (member.result == 1)  {
                    //Check password
                    const passwordIsValid = await this.memberservice.validatePassword(logindata.password, member.data.password)
        
                    if (!passwordIsValid)  {
                        res.status(403).json({ result: -1, error:  "NoPWDMatch"});
                        return;  
                    };
        
                    //Pwd is correct
                    const tokendata = await this.memberservice.generateAccessToken(member.data);
                    //Check MFA data
                    const mfadata = await this.repository.getMFAData(member.data.id);
                    if (mfadata.data.mfadays > 0 && moment(mfadata.data.mfadate) <= moment()) {
                        const mfatoken = Math.floor(100000 + Math.random() * 900000);
                        tokendata.mfatoken = mfatoken.toString();
                        member.data.mfa = mfatoken.toString();
                        await this.repository.updateMember(member.data);

                // if (r.data.mfatoken) {
                //     const mailrepository = new MailRepository();
                //     const mailcontroller = new MailController( mailrepository );
                //     const mail = {
                //         organisation: r.data.user.organisation,
                //         from: "info@acsis.be",
                //         to: r.data.user.email,
                //         subject: "Welcome",
                //         body: `<h3>Welcome to the free online ARM solutions by Acsis</h3>
                //         <p><strong>Below you can find you're one time only code </strong></p>
                        
                //         <br/>
                //         <h1>${r.data.mfatoken}</h1>
                //         <br/>`
                //     };

                //     const mailresponse = await mailcontroller.sendRegisterMail(r.data.user.organisation, mail);
                //     if (mailresponse.result == 1) {
                //         const ret = {result: 1, data: { 
                //             id: r.data.user.id,
                //             name: r.data.user.name,
                //             firstname: r.data.user.firstname, 
                //             email: r.data.user.email,
                //             language: r.data.user.language,
                //             role: r.data.user.role,
                //             mfatoken: true}};
                //         res.status(200).json(ret);
                //         return
                //     }
                //     else {
                //         res.status(403).json(mailresponse);
                //         return;
                //     }
                // }


                    }
                    const sessiondata = {
                            accessToken: tokendata.accessToken,
                            expiresAt: tokendata.expiresAt,
                    }

                    //set cookie information only if not MFA
                    req.session.user = sessiondata;
                
                    const ret = {result: 1, data: {
                        id: member.data.id,
                        name: member.data.name,
                        firstname: member.data.firstname, 
                        email: member.data.email,
                        expiresAt: tokendata.expiresAt,
                        accessToken: tokendata.accessToken, }
                    };
                    res.status(200).json(ret);
                }

                else {
                    res.status(403).json(member);
                    return;
                }
        } catch (error) {
            this.logger.error('Controler: loginMember :' + error.message, null);
            res.status(500).json({ result: -1, error: error.message });
        }
    };

    public confirmLogin = async (req: RequestWithUser, res: Response) => {
        try {
            const memberemail = req.body.email;
            const mfa = req.body.mfa;

            const member = await this.repository.findOneMemberByEmail(memberemail);
            
            if (member.result == 1)  {
                if (member.data.mfa == mfa) {
                    const mfadata = await await this.repository.getMFAData(member.data.id);
                    const mfadate = moment().add(mfadata.data.mfadays, "days");
                    member.data.mfa = null;
                    member.data.mfadate = mfadate;
                    await this.repository.updateMember(member.data);
                    
                    const tokendata = await this.memberservice.generateAccessToken(member.data);

                    const ret = {result: 1, data: {
                        id: member.data.id,
                        name: member.data.name,
                        firstname: member.data.firstname, 
                        email: member.data.email,
                        expiresAt: tokendata.expiresAt,
                        accessToken: tokendata.accessToken, }
                    };
                    res.status(200).json(ret);
                } else {
                    res.status(500).json({ result: -1, error: "MFA token not correct" });
                    return;
                }
            }
            else {
                res.status(500).json({ result: -1, error: "MemberUnKnown" });
                return;
            }
        } catch (error) {
            this.logger.error(error, null);
            res.status(500).json(error);
        }
    }

    public logout = async(req: RequestWithUser, res: Response, next: NextFunction) => {
        // clear the user from the session object and save.
        // this will ensure that re-using the old session id
        // does not have a logged in user
        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)

            req.session.regenerate(function (err) {
                if (err) next(err)
                res.status(200).json({result: 1, data: {message: "logged out"}});
            })
            
        })
    }

    public resetpassword = async(req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const resetlink = req.body.resetlink;
            const pwd = req.body.pwd;
            const memberemail = req.body.email;

            const member = await this.repository.findOneMemberByEmail(memberemail);
        
            if (member.result == 1 )  {
               if (member.data.resetlink == resetlink) {
                    const newpwd = await this.memberservice.generateHashedpassword(pwd);
                    member.data.resetlink = null;
                    member.data.resetlinktimestamp = null;
                    member.data.password = newpwd;
                    await this.repository.updateMember(member.data);

                    const tokendata = await this.memberservice.generateAccessToken(member.data);

                    const ret = {result: 1, data: {
                        id: member.data.id,
                        name: member.data.name,
                        firstname: member.data.firstname, 
                        email: member.data.email,
                        expiresAt: tokendata.expiresAt,
                        accessToken: tokendata.accessToken, }
                    };
                    res.status(200).json(ret);
            } else {
                    res.status(500).json({ result: -1, error: "MFA token not correct" });
                    return;
                }
            }
            else {
                res.status(500).json({ result: -1, error: "MemberUnKnown" });
                return;
            }
        } catch (error) {
            this.logger.error('resetpassword ' + error.message, null);
            return { result: -1, error: error.message };
        }
    }

    public forgetpassword = async(req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const memberemail = req.body.email;
            const callback = req.body.callback;

            const member = await this.repository.findOneMemberByEmail(memberemail);
        
            if (member.result == 1)  {
                const uniquefield = crypto.randomUUID().toString();
                const currentdate = new Date(); 

                member.data.resetlink = uniquefield;
                member.data.resetlinktimestamp = currentdate;
                await this.repository.updateMember(member.data);

                //Send mail with resetlink
                // const callbackurl = callback + uniquefield;
                // //Send mail to email with reset link
                // const mailrepository = new MailRepository();
                // const mailcontroller = new MailController( mailrepository );
                // const mail = {
                //     organisation: u.data.organisation,
                //     from: "info@acsis.be",
                //     to: useremail,
                //     subject: "Reset Password",
                //     body: `<p>Beste ${u.data.firstname},</p>
                //     <p>Gelieve op onderstaande link te klikken om je wachtwoord opnieuw in te stellen</p>
                //     <p><a href="${callbackurl}">Reset password</a></p>
                //     <p>&nbsp;</p>`,
                // };
                // const r = await mailcontroller.sendRegisterMail(u.data.organisation, mail);
                // if (r.result == 1) {
                //     res.status(200).json(u);
                // }
                // else
                // res.status(403).json(r);
                
                res.status(500).json({ result: 1, data: member.data });
                return;
            }
            else {
                res.status(500).json({ result: -1, error: "MemberUnKnown" });
                return;
            }

        } catch (error) {
            next(error);
        }
    }

    // public loginUserAfterConfirm = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    //     const user = await User.findOne({ where: { email: email }});
        
    //     if (user)  {
    //         //Pwd is correct
    //         const tokendata = await this.generateAccessToken(user);

    //         const usertoreturn = await User.findOne({ where: { id :user.id}, include: [ { model: Enum, as: 'languageid'} ],
    //             attributes: { exclude: ['password', 'mfa', 'mfadate', 'organisation', 'active'] }});
    //         return { result: 1, 
    //                 data: { ...tokendata, user: usertoreturn } 
    //             };
    //     }
    //     else {
    //         return { result: -1, error: "UserUnKnown" };
    //     }
    // }
    
}

export { MemberController };