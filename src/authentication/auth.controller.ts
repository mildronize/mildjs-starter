import { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Post, validateType } from 'route-controller';

import { CreateUserDto } from '../users/dtos/users.dto';
import { User } from '../users/users.interface';

import { RequestWithUser } from './auth.interface';
import AuthService from './auth.service';

import authMiddleware from './auth.middleware';

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Post('/signup')
  @Middleware(validateType(CreateUserDto))
  public async signUp(req: Request, res: Response, next: NextFunction) {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  }

  @Middleware(validateType(CreateUserDto))
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
