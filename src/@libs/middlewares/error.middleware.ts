import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import logger from '../config/logger';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.code || 500;
  const message: string = error.message || 'Something went wrong';

  logger.error(`[${status}]: ${message}`);

  res.status(status).json({ message });
}

export default errorMiddleware;
