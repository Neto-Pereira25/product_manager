import { CouponService } from '../../src/services/CouponService';

describe('CouponService - Unit Test', () => {
    const mockRepo = {
        findByCode: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        list: jest.fn(),
        softDelete: jest.fn(),
    };

    const service = new CouponService(mockRepo as any);

    it('create valid coupon if code does not exists', async () => {
        mockRepo.findByCode.mockReturnValue(null);
        mockRepo.create.mockReturnValue({ code: 'promo10' });

        const result = await service.createCoupon({
            code: 'PROMO10',
            type: 'percent',
            value: 10,
            oneShot: false,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 1000 * 60 * 60),
        });

        expect(result.code).toBe('promo10');
    });
});
