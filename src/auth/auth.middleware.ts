import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { HttpException, StatusCodes , combineMiddlewares} from 'route-controller';
import { Container } from 'typeorm-di';
import { DataStoredInToken, RequestWithUser } from './auth.interface';
import { UsersService } from '../users/users.service';
import { logger, vars } from '../app/config';
import { RequestHandler } from 'express';

export async function isAuth(req: RequestWithUser, res: Response, next: NextFunction) {
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

export function validateRole(...roles: string[]): RequestHandler {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (userRole === 'admin') next();
    else {
      if (roles.includes(userRole)) next();
      else
        next(
          new HttpException(
            StatusCodes.UNAUTHORIZED,
            `Permission denied: The role (${userRole}) don't allow to access`,
          ),
        );
    }
  };
}

export function isRole(...allowedRole: string[]): RequestHandler {
  return combineMiddlewares(isAuth, validateRole(...allowedRole));
}
