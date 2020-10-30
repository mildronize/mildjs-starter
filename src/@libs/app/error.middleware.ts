import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { logger } from '../config';

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  let code: number;
  let message: string = error.message || 'Something went wrong';

  if (error instanceof HttpException) {
    code = error.toJSON().code;
  } else {
    code = 500;
  }

  logger.error(`[${code}]: ${message}`);
  res.status(code).json({ message, status: 'error' });
}

export default errorMiddleware;
