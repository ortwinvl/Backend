import { Router } from 'express';
import { BackOfficeController } from 'controllers';
import { IRoute, CreateEnumDto, UpdateEnumDto } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middlewares';
import { BASEPATH } from '../config';
import { Container } from 'typedi';

class BackOfficeRoute implements IRoute {
  public path = BASEPATH + 'backoffice/';
  public router = Router();
  public controller = Container.get(BackOfficeController);
  public authmiddleware = Container.get(authMiddleware);
  
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}enumvalues`, this.authmiddleware.verifyToken, this.controller.listEnumValues);
    this.router.get(`${this.path}enumvalues/:enumtype`, this.authmiddleware.verifyToken, this.controller.listEnumValuesForType);
    this.router.post(`${this.path}enumvalues`, [this.authmiddleware.verifyToken, validationMiddleware(CreateEnumDto, 'body', true)], this.controller.createEnumValue);
    this.router.put(`${this.path}enumvalues/:id`, [this.authmiddleware.verifyToken, validationMiddleware(UpdateEnumDto, 'body', true)], this.controller.updateEnumValue);
    this.router.delete(`${this.path}enumvalues/:id`, this.authmiddleware.verifyToken, this.controller.deleteEnumValue);
  }
}

export { BackOfficeRoute }; 