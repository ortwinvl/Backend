/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  whitelist = true,
  forbidNonWhitelisted = false,
): RequestHandler => {
  return async (req, res, next) => {
    //console.log(req.body);
    validate(plainToInstance(type, req.body), { whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
        res.status(403).send({ id: -1, error: message });
        return;
      } else {
        next();
      }
    });
  };
};

export { validationMiddleware } ;
