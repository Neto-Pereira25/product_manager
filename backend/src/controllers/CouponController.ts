import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CouponService } from '../services/CouponService';
import { CreateCouponSchema } from '../schemas/coupon.schema';
import { standardHttpResponse, standardHttpResponseError } from '../utils/standardHttpResponse';
import { standardHttpMessage } from '../utils/standardHttpMessage';

const service = new CouponService();

export class CouponController {
    async create(req: Request, res: Response) {
        const parsed = CreateCouponSchema.safeParse(req.body);

        if (!parsed.success) {
            standardHttpResponse(res, StatusCodes.BAD_REQUEST, parsed.error.errors.map(err => err.message));
            return;
        }

        try {
            const created = await service.createCoupon(parsed.data);
            standardHttpResponse(res, StatusCodes.CREATED, created);
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const coupon = await service.getCouponById(Number(req.params.id));
            standardHttpResponse(res, StatusCodes.OK, coupon);
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async list(req: Request, res: Response) {
        try {
            const coupons = await service.listCoupons();
            standardHttpResponse(res, StatusCodes.OK, coupons);
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async update(req: Request, res: Response) {
        const validation = CreateCouponSchema.safeParse(req.body);

        if (!validation.success) {
            standardHttpResponse(res, StatusCodes.BAD_REQUEST, validation.error.errors.map(err => err.message));
            return;
        }

        try {
            const updated = await service.updateCoupon(Number(req.params.id), validation.data);
            standardHttpResponse(res, StatusCodes.OK, updated);
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }

    async remove(req: Request, res: Response) {
        try {
            await service.deleteCoupon(Number(req.params.id));
            standardHttpResponse(res, StatusCodes.NO_CONTENT, {
                message: standardHttpMessage.NO_CONTENT
            })
        } catch (e) {
            standardHttpResponseError(res, e);
            return;
        }
    }
}