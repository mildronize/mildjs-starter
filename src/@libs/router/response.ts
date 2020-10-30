import HttpException from '../exceptions/HttpException';
import { NextFunction, Request, Response} from 'express';

export function success(res: Response, data: any, message?: string) {
    res.status(200).json({ data, message, status: 'success' });
}
