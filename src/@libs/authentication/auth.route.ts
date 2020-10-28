import { Router } from 'express';
import {AuthController} from './auth.controller';
import { CreateUserDto } from '../../users/dtos/users.dto';
import { Route } from '../router';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = "";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`/login`, validationMiddleware(CreateUserDto), this.authController.logIn);
    this.router.post(`/logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
