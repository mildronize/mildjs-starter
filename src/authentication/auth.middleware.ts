import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { HttpException , Container} from 'route-controller';
import { DataStoredInToken, RequestWithUser } from './auth.interface';
// import { Container } from 'typeorm';
import {UsersService} from '../users/users.service';
import { vars } from '../app/config';

export async function validateAuth(req: RequestWithUser, res: Response, next: NextFunction) {

    // const cookies = req.cookies;

    const userService: UsersService = Container.get(UsersService);
  
    if (req.headers.authorization) {
      const secret = vars.jwtSecret;
  
      try {
        const requestToken = req.headers.authorization;
        const verificationResponse = jwt.verify(requestToken, secret) as DataStoredInToken;
        const userId = verificationResponse.id;
  
        const findUser = await userService.findById(userId);
  
        if (findUser) {
          req.user = findUser;
          next();
        } else {
          next(new HttpException(401, "Wrong authentication token: Can't find user"));
        }
      } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
  }
  
}