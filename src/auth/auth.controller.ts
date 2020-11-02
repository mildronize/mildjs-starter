import { NextFunction, Request, Response } from 'express';
import { Controller, Use, Post, StatusCodes, validateType, HttpException, responseFormat } from 'route-controller';

import { CreateUserDto } from '../users/dtos/users.dto';
import { User } from '../users/users.entity';

import { AuthService } from './auth.service';
import { isAuth } from './auth.middleware';
import { UsersService } from '../users/users.service';
import { isEmptyObject } from '../app/util';
import * as jwt from 'jsonwebtoken';
import { vars } from '../app/config';
import { DataStoredInToken, RequestWithUser } from './auth.interface';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) { }

  @Use(validateType(CreateUserDto))
  @Post('/signup')
  public async signUp(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;
    const signUpUserData: User = await this.userService.create(userData);
    responseFormat(res, { data: signUpUserData });
  }

  @Use(validateType(CreateUserDto))
  @Post('/login')
  public async logIn(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;

    const findUser: User = await this.userService.findByEmail(userData.email);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = userData.password === findUser.password;
    if (!isPasswordMatching) throw new HttpException(409, `The password is incorrect`);

    const { token, user } = await this.authService.login(findUser);
    let data;
    if (user && user.password === userData.password) {
      const { password, ...result } = user;
      data = result;
    }
    responseFormat(res, {
      data: { user, authorization: token }
    });

  }

  @Use(isAuth)
  @Post('/logout')
  public async logOut(req: Request, res: Response) {
 
    responseFormat(res, { message: 'logout' });
  }

  @Post('/test')
  @Use(validateType(CreateUserDto), isAuth)
  public async testAuth(req: Request, res: Response) {
    const secret = vars.jwtSecret;
    const requestToken = req.headers.authorization;

    const verificationResponse = jwt.verify(requestToken, secret) as DataStoredInToken;
    const findUser = await this.userService.findById(verificationResponse.id);
    responseFormat(res, { message: `Hi ${findUser.email}` });
  }

}
