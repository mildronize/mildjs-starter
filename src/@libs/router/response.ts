import HttpException from '../exceptions/HttpException';
import { NextFunction, Request, Response} from 'express';

export function success(res: Response, data: any, message?: string) {
    res.status(200).json({ data, message, status: 'success' });
}

export function error(res: Response, error: Error) {
    let code = 400;
    let message;
    if (error instanceof HttpException){
        const errorObj = error.toJSON();
        code = errorObj.code;
        message = errorObj.message;
        }
    res.status(code).json({ message , status: 'error' });
}