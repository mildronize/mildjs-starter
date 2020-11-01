import { NextFunction, Request, Response } from 'express';
import { Controller, Middleware, Post, StatusCodes, validateType } from 'route-controller';

import { CreateUserDto } from '../users/dtos/users.dto';
import { User } from '../users/users.entity';

import { RequestWithUser } from './auth.interface';
import {AuthService} from './auth.service';
import {validateAuth} from './auth.middleware';

@Controller('/auth')
export class AuthController {

  constructor(private authService: AuthService){}

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
    const { token, user } = await this.authService.login(userData);
    let data;
    if (user && user.password === userData.password) {
      const { password, ...result } = user;
      data = result;
    }
    res.status(StatusCodes.OK).json({ data , "authorization": token });
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
