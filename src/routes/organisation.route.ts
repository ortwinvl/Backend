import { Router } from 'express';
import { OrganisationController } from '../controllers';
import { IRoute } from '../interfaces';
import { authMiddleware, validationMiddleware, verifySignUp } from '../middlewares';
import { CreateUpdateOrganisationDto, CreateOrganisationUserDto } from '../interfaces';
import { BASEPATH } from '../config';
import { Container } from 'typedi';

class OrganisationRoute implements IRoute {
  public path = BASEPATH;
  public router = Router();
  public controller = Container.get(OrganisationController);
  public authmiddleware = Container.get(authMiddleware);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}organisations`,[this.authmiddleware.verifyToken], this.controller.listAllOrganisations);
    this.router.get(`${this.path}organisations/:id`,[this.authmiddleware.verifyToken], this.controller.getOneOrganisationById);
    this.router.post(`${this.path}organisations`, [validationMiddleware(CreateOrganisationUserDto, 'body'), verifySignUp.checkDuplicateUsernameOrEmail], this.controller.createNewOrganisation);
    this.router.put(`${this.path}organisations/:id`, [this.authmiddleware.verifyToken, validationMiddleware(CreateUpdateOrganisationDto, 'body', true)], this.controller.updateOrganisation);
    this.router.get(`${this.path}organisations/:id/confirm`, this.controller.confirmNewOrganisation);
  }
}

export { OrganisationRoute };