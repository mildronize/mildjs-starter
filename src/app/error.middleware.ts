import { NextFunction, Request, Response } from 'express';
import { HttpException, StatusCodes, responseFormat } from 'route-controller';
import { logger } from './config';

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  let code: number;
  let message: string = error.message || 'Something went wrong';

  if (error instanceof HttpException) {
    code = error.toJSON().code;
  } else {
    code = StatusCodes.BAD_REQUEST;
  }

  logger.info(`[App Error Handler] [${code}]: ${message}`);
  responseFormat(res, {
    code,
    message,
    status: 'error',
  });
}

export default errorMiddleware;
