import { Router } from 'express';
import { ResultController } from '../controllers';
import { IRoute } from '../interfaces';
import { authMiddleware, validationMiddleware } from '../middlewares';
import { CreateResultDto } from '../interfaces';
import { BASEPATH } from '../config';
import { Container } from 'typedi';

class ResultRoute implements IRoute {
  public path = BASEPATH;
  public router = Router();
  public controller = Container.get(ResultController);
  public authmiddleware = Container.get(authMiddleware);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}results`,[this.authmiddleware.verifyToken], this.controller.listAllResults);
    this.router.get(`${this.path}results/:id`,[this.authmiddleware.verifyToken], this.controller.getOneResultById);
    this.router.post(`${this.path}results`, [this.authmiddleware.verifyToken, validationMiddleware(CreateResultDto, 'body')], this.controller.createResult);
    this.router.delete(`${this.path}results/:id`, [this.authmiddleware.verifyToken], this.controller.deleteResult);
  }
}

export { ResultRoute };