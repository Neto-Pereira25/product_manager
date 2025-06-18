import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { standardHttpResponse } from '../utils/standardHttpResponse';

export default async function HomeController(req: Request, res: Response): Promise<void> {
    standardHttpResponse(res, StatusCodes.OK, { message: 'Aplicação funcionando com sucesso' });
}