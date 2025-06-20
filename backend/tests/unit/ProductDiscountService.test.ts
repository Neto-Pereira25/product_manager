
const mockPrisma = {
    productDiscount: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findFirst: jest.fn(),
    },
    product: {
        findUnique: jest.fn(),
    },
    coupon: {
        findFirst: jest.fn(),
        update: jest.fn(),
    },
    $transaction: jest.fn(),
};

jest.mock('../../src/config/prisma', () => ({
    prisma: mockPrisma,
}));

import { ProductDiscountService } from '../../src/services/ProductDiscountService';
import { Decimal } from '@prisma/client/runtime/library';

const service = new ProductDiscountService();

describe('ProductDiscountService - Unit Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('must apply direct percentage discount', async () => {
        mockPrisma.productDiscount.findUnique.mockResolvedValue(null);
        mockPrisma.product.findUnique.mockResolvedValue({
            id: 1,
            price: new Decimal(100),
        });

        mockPrisma.productDiscount.create.mockResolvedValue({ id: 1 });

        const result = await service.applyPercentDiscount(1, 20);
        expect(result.id).toBe(1);
    });

    it('must reject if product already has discount', async () => {
        mockPrisma.productDiscount.findFirst.mockResolvedValue({ id: 1, removedAt: null });

        await expect(service.applyPercentDiscount(1, 10)).rejects.toEqual({
            status: 409,
            message: 'O produto já possui um desconto ativo',
        });
    });

    it('should successfully remove discount', async () => {
        mockPrisma.productDiscount.findFirst.mockResolvedValue({ id: 1, removedAt: null });
        mockPrisma.productDiscount.update.mockResolvedValue({ removedAt: new Date() });

        const result = await service.removeDiscount(1);
        expect(result.removedAt).not.toBeNull();
    });
});