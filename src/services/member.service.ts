import bcrypt from 'bcryptjs';
import { BASEORGANISATION, SECRET_KEY } from '../config';
import { IMember, TokenData } from '../interfaces';
import jsonwebtoken  from "jsonwebtoken";
import { Service } from "typedi";

@Service()
class MemberService {

    //Generate a hashed password
    public generateHashedpassword(pwd: string): string {
        const SALT_WORK_FACTOR = 10;
        // generate a salt
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        const hash = bcrypt.hashSync(pwd, salt);

        return hash;
    }

    //Generate  token with embedded data
    public async generateAccessToken(member: IMember) : Promise<TokenData> {
        let isbackoffice = false;
        if (member.organisation == BASEORGANISATION && member.isadmin) isbackoffice = true;

        const token = await jsonwebtoken.sign({ id: member.id, organisationid: member.organisation, isadmin: member.isadmin, language: 1, isbackoffice: isbackoffice }, SECRET_KEY, {
            expiresIn: '24h'
        });
        const expiresat = new Date();
        expiresat.setHours(expiresat.getHours() + 24);

        return { 
                accessToken: token,
                expiresAt: expiresat
        };
    }

    //Validate password
    public async validatePassword(pwd: string, avedpwd: string) : Promise<boolean>{
        return await bcrypt.compare(pwd, avedpwd);
    }
}

export {MemberService};