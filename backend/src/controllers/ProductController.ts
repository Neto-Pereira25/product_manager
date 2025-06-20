import { Request, Response } from 'express';

import { ProductService } from '../services/ProductService';
import { CreateProductSchema } from '../schemas/product.schema';
import { standardHttpResponse, standardHttpResponseError } from '../utils/standardHttpResponse';
import { StatusCodes } from 'http-status-codes';
import { standardHttpMessage } from '../utils/standardHttpMessage';

const service = new ProductService();

export class ProductController {
    async create(req: Request, res: Response) {
        if (!req.body) {
            standardHttpResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                error: 'Dados do produto inválidos ou ausentes'
            });
            return;
        }

        const validation = CreateProductSchema.safeParse(req.body);

        if (!validation.success) {
            standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
            return;
        }

        try {
            const created = await service.createProduct(validation.data);
            standardHttpResponse(res, StatusCodes.CREATED, created);
            return;
        } catch (e: any) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const product = await service.getProduct(Number(req.params.id));
            standardHttpResponse(res, StatusCodes.OK, product);
            return;
        } catch (e: any) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async update(req: Request, res: Response) {
        if (!req.body) {
            standardHttpResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                error: 'Dados do produto inválidos ou ausentes'
            });
            return;
        }

        const validation = CreateProductSchema.safeParse(req.body);

        if (!validation.success) {
            standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
            return;
        }

        try {
            const updated = await service.updateProduct(Number(req.params.id), req.body);
            standardHttpResponse(res, StatusCodes.OK, updated);
            return;
        } catch (e: any) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async softDelete(req: Request, res: Response) {
        try {
            await service.softDeleteProduct(Number(req.params.id));
            standardHttpResponse(res, StatusCodes.NO_CONTENT, {
                message: standardHttpMessage.NO_CONTENT.message
            });
            return;
        } catch (e: any) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async restore(req: Request, res: Response) {
        try {
            const restored = await service.restoreProduct(Number(req.params.id));
            standardHttpResponse(res, StatusCodes.OK, restored);
            return;
        } catch (e: any) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async list(req: Request, res: Response) {
        try {
            const list = await service.listProducts();
            standardHttpResponse(res, StatusCodes.OK, list);
            return;
        } catch (e: any) {
            standardHttpResponseError(res, e);
            return;
        }
    }
}