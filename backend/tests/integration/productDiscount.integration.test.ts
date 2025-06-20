import { ProductDiscountService } from '../../src/services/ProductDiscountService';
import { ProductDiscountRepository } from '../../src/repositories/ProductDiscountRepository';

import { ProductService } from '../../src/services/ProductService';
import { ProductRepository } from '../../src/repositories/ProductRepository';

import { CouponService } from '../../src/services/CouponService';
import { CouponRepository } from '../../src/repositories/CouponRepository';

import { prisma } from '../../src/config/prisma';

const discountService = new ProductDiscountService();
const discountRepository = new ProductDiscountRepository();

const productService = new ProductService();
const productRepository = new ProductRepository();

const couponService = new CouponService();
const couponRepository = new CouponRepository();

describe('ProductDiscountService', () => {
    let productId: number;
    let couponCode: string;

    beforeAll(async () => {
        await prisma.$connect();

        const product = await productService.createProduct({
            name: 'Produto Desconto',
            description: '',
            stock: 10,
            price: 200.0,
        });

        if (product) {
            productId = product.id;
        } else {
            console.log('Errou ao criar produto');
        }

        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);

        const coupon = await couponService.createCoupon({
            code: 'DESCONTAO',
            type: 'percent',
            value: 25,
            oneShot: false,
            validFrom: now,
            validUntil: nextWeek,
        });

        if (coupon) {
            couponCode = coupon.code;
        } else {
            console.log('Errou ao criar cupom');
        }

    });

    afterAll(async () => {
        try {
            const product = await productRepository.findByNormalizedName('Produto Desconto');
            const coupon = await couponRepository.findByCode('DESCONTAO');

            if (product) {
                // Busca todos os descontos do produto (ativo ou não)
                const discounts = await prisma.productDiscount.findMany({
                    where: { productId: product.id },
                });

                // Deleta todos os descontos relacionados ao produto
                for (const discount of discounts) {
                    await prisma.productDiscount.delete({ where: { id: discount.id } });
                }

                // Agora pode deletar o produto
                await prisma.product.delete({ where: { id: product.id } });
            }

            if (coupon) {
                await prisma.coupon.delete({ where: { id: coupon.id } });
            }
        } catch (error) {
            console.error('❌ Erro no afterAll:', error);
        } finally {
            await prisma.$disconnect();
        }
    });

    it('must apply direct percentage discount successfully', async () => {
        const result = await discountService.applyPercentDiscount(productId, 15);
        expect(result).toHaveProperty('id');
        expect(result.type).toBe('percent');
    });

    it('must not apply a second discount to a product that has already been discountd', async () => {
        try {
            await discountService.applyPercentDiscount(productId, 10);
        } catch (e: any) {
            expect(e.status).toBe(409);
        }
    });

    it('should  successfully remove discount', async () => {
        const result = await discountService.removeDiscount(productId);
        expect(result.removedAt).not.toBeNull();
    });
});