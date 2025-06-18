import { Response } from 'express';

export const standardHttpResponse = (res: Response, statusCode: number, message: Object): Response => {
    return res.status(statusCode).json(message);
}