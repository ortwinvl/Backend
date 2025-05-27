import { NextFunction, Response, Request } from 'express';
import { Member } from "../models";
import { Op } from 'sequelize';

const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) =>{
    // Email
    let u = null;
    if (req.body.id) {
        u = await Member.findOne({ where: {email: req.body.email, [Op.not] : {id: req.body.id }}});
    }
    else{
        u = await Member.findOne({where :{email: req.body.email}});
    }
    if (u) {
        res.status(200).json({ result: "-1", error: "DuplicateEmail" });
        return;
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

export { verifySignUp };