import { CouponService } from '../../src/services/CouponService';
import { CouponRepository } from '../../src/repositories/CouponRepository';
import { prisma } from '../../src/config/prisma';

const service = new CouponService();
const repository = new CouponRepository();

describe('CouponService - Integration Test', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        const coupon = await repository.findByCode('PROMO20');

        if (coupon) {
            await prisma.coupon.delete({
                where: { id: coupon.id }
            });
        }

        await prisma.$disconnect();
    });

    it('must create a valid coupon', async () => {
        const now = new Date();
        const later = new Date();
        later.setDate(now.getDate() + 7);

        const coupon = await service.createCoupon({
            code: 'PROMO20',
            type: 'percent',
            value: 20,
            oneShot: true,
            validFrom: now,
            validUntil: later,
        });

        expect(coupon.code).toBe('promo20');
    });
});
