import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../users/dtos/users.dto';
import { RequestWithUser } from './auth.interface';
import { User } from '../users/users.interface';
import AuthService from './auth.service';

import { Controller, Middleware, Post } from 'route-controller';
import validationMiddleware from '../@libs/middlewares/validation.middleware';
import authMiddleware from './auth.middleware';

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Post('/signup')
  @Middleware(validationMiddleware(CreateUserDto))
  public async signUp(req: Request, res: Response, next: NextFunction) {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  }

  @Middleware(validationMiddleware(CreateUserDto))
  @Post('/login')
  public async logIn(req: Request, res: Response, next: NextFunction) {
    const userData: CreateUserDto = req.body;

    try {
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  }

  @Middleware(authMiddleware)
  @Post('/logout')
  public async logOut(req: RequestWithUser, res: Response, next: NextFunction) {
    const userData: User = req.user;

    try {
      const logOutUserData: User = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  }
}
