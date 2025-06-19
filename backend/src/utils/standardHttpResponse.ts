import { Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { StatusCodes } from 'http-status-codes';

import { standardHttpMessage } from './standardHttpMessage';

export const standardHttpResponse = (res: Response, statusCode: number, obj: Object): Response => {
    return res.status(statusCode).json(obj);
}

export const standardHttpResponseError = (res: Response, e: any): Response => {
    if (e instanceof PrismaClientKnownRequestError) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: e.message });
    } else if (e instanceof PrismaClientValidationError) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: e.message });
    } else {
        return res.status(e.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message || standardHttpMessage.INTERNAL_SERVER_ERROR.message });
    }
}