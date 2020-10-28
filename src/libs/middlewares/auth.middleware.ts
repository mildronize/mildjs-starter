import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../../interfaces/auth.interface';
import userModel from '../../models/users.model';

function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const cookies = req.cookies;


  console.log("===> ",  req.headers.authorization );

  if (req.headers.authorization) {
    const secret = process.env.JWT_SECRET;
    
    try {
      const requestToken = req.headers.authorization;
      const verificationResponse = jwt.verify(requestToken, secret) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = userModel.find(user => user.id === userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token: Can\'t find user'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } else {
    next(new HttpException(404, 'Authentication token missing'));
  }
}

export default authMiddleware;
