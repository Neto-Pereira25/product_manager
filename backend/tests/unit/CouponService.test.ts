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

    it('does not allow duplicate code', async () => {
        mockRepo.findByCode.mockReturnValue({ id: 1 });

        await expect(
            service.createCoupon({
                code: 'PROMO10',
                type: 'percent',
                value: 10,
                oneShot: false,
                validFrom: new Date(),
                validUntil: new Date(Date.now() + 1000 * 60 * 60),
            })
        ).rejects.toEqual({
            status: 409,
            message: 'Recurso já existe na base de dados'
        });
    });

    it('throws error when updating code', async () => {
        mockRepo.findById.mockReturnValue({ id: 1, code: 'promo10' });

        await expect(
            service.updateCoupon(1, {
                code: 'outro-codigo-qualquer',
            })
        ).rejects.toEqual({
            status: 400,
            message: 'A requisição está mal formada ou inválida'
        });
    });
});
