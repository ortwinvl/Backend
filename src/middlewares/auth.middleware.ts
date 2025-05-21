import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { RequestWithUser, ILogger } from '../interfaces';
import { Service, Inject } from "typedi";

@Service()
class authMiddleware {
    constructor(@Inject("logger") protected logger: ILogger) {
    }

  public verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (req.session && req.session.user) {
        const verificationResponse = (await this.checkToken(req.session.user.accessToken));
        if (verificationResponse && verificationResponse.result == 0 ) {
          req.userid = verificationResponse.userid;
          req.organisationid = verificationResponse.organisationid;
          req.isadmin = verificationResponse.isadmin;
          req.isbackoffice = verificationResponse.isbackoffice;
          req.language = verificationResponse.language;
          next();
        } 
        else {
          res.status(401).json({result: -1, data: verificationResponse});
        }
      } else {
          const headers = JSON.stringify(req.headers);
          this.logger.info(`Authentication token missing req : ${headers}`, null);
          const test = JSON.stringify(req.session);
          this.logger.info(`Authentication token missing req.session: ${test}`, null);
          res.status(401).json({result: -1, data: {message: "Authentication token missing"}});
      }
    } catch (error) {
      res.status(401).json({result: -1, data: {message: "Wrong authentication token " + error.message}});
    }
  };

  public checkToken = async(token) => {
    try {
        const r = await verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return { result: -1, error: `Unauthorized : ${err}` };
            }
            return { result: 0, userid: decoded['id'], organisationid: decoded['organisationid'], isadmin: decoded['isadmin'], language: decoded['language'], isbackoffice: decoded['isbackoffice']};
        });
        return r;

    } catch (error) {
        this.logger.error("checkToken: " + error.message, null);
        return { result: -2, error: error };
    }
  };
}

 export { authMiddleware };