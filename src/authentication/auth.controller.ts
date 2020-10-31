import { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Post, StatusCodes, validateType } from 'route-controller';

import { CreateUserDto } from '../users/dtos/users.dto';
import { User } from '../users/users.entity';

import { RequestWithUser } from './auth.interface';
import AuthService from './auth.service';

import {validateAuth} from './auth.middleware';

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Middleware(validateType(CreateUserDto))
  @Post('/signup')
  public async signUp(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;

    const signUpUserData: User = await this.authService.signup(userData);
    res.status(StatusCodes.CREATED).json({ data: signUpUserData, message: 'signup' });
  }

  @Middleware(validateType(CreateUserDto))
  @Post('/login')
  public async logIn(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;
    const { cookie, user } = await this.authService.login(userData);
    res.setHeader('Set-Cookie', [cookie]);
    res.status(StatusCodes.OK).json({ data: user, message: 'login' });
  }

  @Middleware(validateAuth)
  @Post('/logout')
  public async logOut(req: RequestWithUser, res: Response) {
    const userData: User = req.user;
    const logOutUserData: User = await this.authService.logout(userData);
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(StatusCodes.OK).json({ data: logOutUserData, message: 'logout' });
  }

}
