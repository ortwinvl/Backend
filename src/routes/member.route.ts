import { Router } from 'express';
import { MemberController } from '../controllers';
import { CreateMemberDto, UpdateMemberDto, IRoute, LoginDto } from '../interfaces';
import { authMiddleware, validationMiddleware, verifySignUp } from '../middlewares';
import { BASEPATH } from '../config';
import { Container } from 'typedi';

class MembersRoute implements IRoute {
  public path = BASEPATH + 'members/';
  public router = Router();
  public controller = Container.get(MemberController);
  public authmiddleware = Container.get(authMiddleware);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [this.authmiddleware.verifyToken], this.controller.listAllMembers);
    this.router.get(`${this.path}logout`, [this.authmiddleware.verifyToken], this.controller.logout);
    this.router.get(`${this.path}:id`, [this.authmiddleware.verifyToken], this.controller.getOneMemberById);
    this.router.post(`${this.path}`, [this.authmiddleware.verifyToken, validationMiddleware(CreateMemberDto, 'body', true), verifySignUp.checkDuplicateUsernameOrEmail], this.controller.createMember);
    this.router.post(`${this.path}login`, [validationMiddleware(LoginDto, 'body', true)], this.controller.loginMember);
    this.router.put(`${this.path}:id`, [this.authmiddleware.verifyToken, validationMiddleware(UpdateMemberDto, 'body', true)], this.controller.updateMember);
    this.router.delete(`${this.path}:id`, [this.authmiddleware.verifyToken], this.controller.deleteMember);
    this.router.post(`${this.path}deletemultiple`, [this.authmiddleware.verifyToken], this.controller.deleteMembers);
  }
}

export { MembersRoute };