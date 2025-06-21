import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export class ProductDiscountRepository {
    async findActiveByProductId(productId: number) {
        return prisma.productDiscount.findFirst({
            where: {
                productId,
                removedAt: null,
            },
        });
    }

    async findHistoricalByProductAndCoupon(productId: number, couponId: number) {
        return prisma.productDiscount.findFirst({
            where: {
                productId,
                couponId,
            },
        });
    }

    async createPercentDiscount(productId: number, percent: number) {
        return prisma.productDiscount.create({
            data: {
                productId,
                type: 'percent',
                value: percent,
            },
        });
    }

    async createCouponDiscount(productId: number, couponId: number, tx: Prisma.TransactionClient = prisma) {
        return tx.productDiscount.create({
            data: {
                productId,
                type: 'coupon',
                couponId,
            },
        });
    }

    async updateToRemoved(id: number) {
        return prisma.productDiscount.update({
            where: { id },
            data: {
                removedAt: new Date(),
            },
        });
    }

    async incrementCouponUsage(couponId: number, tx: Prisma.TransactionClient = prisma) {
        return tx.coupon.update({
            where: { id: couponId },
            data: {
                usesCount: { increment: 1 },
            },
        });
    }

    async findCouponByCode(code: string) {
        return prisma.coupon.findFirst({
            where: {
                code: {
                    equals: code,
                    mode: 'insensitive',
                },
                deletedAt: null,
            },
        });
    }

    async listDiscounts() {
        return prisma.productDiscount.findMany({
            where: {
                removedAt: null
            }
        });
    }
}