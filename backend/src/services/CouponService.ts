import { StatusCodes } from 'http-status-codes';
import { CouponRepository } from '../repositories/CouponRepository';
import { CreateCouponDTO } from '../schemas/coupon.schema';
import { CouponType } from '../types/CouponType';
import { normalizeString } from '../utils/normalize';
import { standardHttpMessage } from '../utils/standardHttpMessage';

export class CouponService {
    constructor(
        private couponRepository: CouponRepository = new CouponRepository()
    ) { }

    async createCoupon(data: CreateCouponDTO): Promise<CouponType> {
        const normalizedCode = normalizeString(data.code);

        const existing = await this.couponRepository.findByCode(normalizedCode);

        if (existing) {
            if (existing.deletedAt !== null) {
                const coupon = await this.restoreCoupon(existing.id, {
                    ...data,
                    code: normalizedCode
                });
                throw {
                    status: StatusCodes.OK,
                    message: {
                        obs: 'Cupom restaurado com sucesso.',
                        coupon,
                    }
                };
            }
            throw standardHttpMessage.CONFLICT;
        }

        return this.couponRepository.create({
            ...data,
            code: normalizedCode,
            usesCount: 0,
            createdAt: new Date(),
        });
    }

    async getCouponById(id: number): Promise<CouponType> {
        const coupon = await this.couponRepository.findById(id);

        if (!coupon || coupon.deletedAt) {
            throw standardHttpMessage.NOT_FOUND;
        }

        return coupon;
    }

    async listCoupons(): Promise<CouponType[]> {
        return this.couponRepository.list();
    }

    async deleteCoupon(id: number): Promise<void> {
        const coupon = await this.couponRepository.findById(id);

        if (!coupon || coupon.deletedAt) {
            throw standardHttpMessage.NOT_FOUND;
        }

        await this.couponRepository.softDelete(id);
    }

    async updateCoupon(id: number, data: Partial<CreateCouponDTO>): Promise<CouponType> {
        const coupon = await this.couponRepository.findById(id);

        if (!coupon || coupon.deletedAt) {
            throw standardHttpMessage.NOT_FOUND;
        }

        if (data.code && normalizeString(data.code) !== coupon.code) {
            throw standardHttpMessage.BAD_REQUEST;
        }

        return this.couponRepository.update(id, {
            ...data,
            updatedAt: new Date(),
        });
    }

    async restoreCoupon(id: number, data: Partial<CreateCouponDTO>): Promise<CouponType> {
        const coupon = await this.couponRepository.findById(id);

        if (!coupon || coupon.deletedAt === null) {
            throw standardHttpMessage.NOT_FOUND;
        }

        await this.couponRepository.restore(id);

        return this.updateCoupon(id, data);
    }
}