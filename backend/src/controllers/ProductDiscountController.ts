import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ProductDiscountService } from '../services/ProductDiscountService';
import { standardHttpResponse, standardHttpResponseError } from '../utils/standardHttpResponse';
import { ApplyCouponDiscountSchema, ApplyPercentDiscountSchema, ProductIdDiscountSchema } from '../schemas/product.discount.schema';

const service = new ProductDiscountService();

export class ProductDiscountController {
    async applyPercent(req: Request, res: Response) {

        if (!req.body) {
            standardHttpResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                error: 'Valor percentual inválido ou ausente'
            });
            return;
        }

        const { percent } = req.body;
        const productId = Number(req.params.id);

        const validation = ApplyPercentDiscountSchema.safeParse({ productId, percent });

        if (!validation.success) {
            standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
            return;
        }

        try {
            const result = await service.applyPercentDiscount(productId, percent);
            standardHttpResponse(res, StatusCodes.CREATED, result);
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async applyCoupon(req: Request, res: Response) {

        if (!req.body) {
            standardHttpResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                error: 'Código do cupom inválido ou ausente'
            });
            return;
        }

        const { code } = req.body;
        const productId = Number(req.params.id);

        const validation = ApplyCouponDiscountSchema.safeParse({ productId, code });

        if (!validation.success) {
            standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
            return;
        }

        try {
            const result = await service.applyCouponDiscount(productId, code);
            standardHttpResponse(res, StatusCodes.CREATED, result);
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async remove(req: Request, res: Response) {
        const productId = Number(req.params.id);

        try {
            const validation = ProductIdDiscountSchema.safeParse({ productId });

            if (!validation.success) {
                standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
                return;
            }

            await service.removeDiscount(productId);
            standardHttpResponse(res, StatusCodes.NO_CONTENT, {
                message: 'Disconto removido com sucesso'
            });
        } catch (e) {
            standardHttpResponseError(res, e);
        }
    }

    async getDiscount(req: Request, res: Response) {
        if (!req.body) {
            standardHttpResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                error: 'Código do cupom inválido ou ausente'
            });
            return;
        }

        const { productId } = req.body;

        try {
            const validation = ProductIdDiscountSchema.safeParse({ productId });

            if (!validation.success) {
                standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
                return;
            }

            const discount = await service.findDiscount(validation.data.productId);

            standardHttpResponse(res, StatusCodes.OK, discount);
        } catch (e) {
            standardHttpResponseError(res, e);
        }
    }

    async getDiscounts(req: Request, res: Response) {

        try {
            const discounts = await service.findDiscounts();

            standardHttpResponse(res, StatusCodes.OK, discounts);
        } catch (e) {
            standardHttpResponseError(res, e);
        }
    }
}
