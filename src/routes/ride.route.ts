import { Router } from 'express';
import { RideController } from '../controllers';
import { IRoute } from '../interfaces';
import { authMiddleware, validationMiddleware, verifySignUp } from '../middlewares';
import { CreateRideDto, UpdateRideDto } from '../interfaces';
import { BASEPATH } from '../config';
import { Container } from 'typedi';

class RideRoute implements IRoute {
  public path = BASEPATH;
  public router = Router();
  public controller = Container.get(RideController);
  public authmiddleware = Container.get(authMiddleware);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}rides`,[this.authmiddleware.verifyToken], this.controller.listAllRides);
    this.router.get(`${this.path}rides/:id`,[this.authmiddleware.verifyToken], this.controller.getOneRideById);
    this.router.post(`${this.path}rides`, [this.authmiddleware.verifyToken, validationMiddleware(CreateRideDto, 'body')], this.controller.createRide);
    this.router.put(`${this.path}rides/:id`, [this.authmiddleware.verifyToken, validationMiddleware(UpdateRideDto, 'body', true)], this.controller.updateRide);
    this.router.delete(`${this.path}rides/:id`, [this.authmiddleware.verifyToken], this.controller.deleteRide);
  }
}

export { RideRoute };