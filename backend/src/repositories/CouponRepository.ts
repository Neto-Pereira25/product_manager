import { Prisma } from '@prisma/client';

import { prisma } from '../config/prisma';
import { normalizeString } from '../utils/normalize';
import { CouponType } from '../types/CouponType';

export class CouponRepository {
    async findByCode(code: string): Promise<CouponType | null> {
        const normalized = normalizeString(code);
        return prisma.coupon.findFirst({
            where: {
                code: {
                    equals: normalized,
                    mode: 'insensitive'
                }
            }
        });
    }

    async create(data: Prisma.CouponCreateInput): Promise<CouponType> {
        return prisma.coupon.create({ data });
    }

    async findById(id: number): Promise<CouponType | null> {
        return prisma.coupon.findUnique({ where: { id } });
    }

    async list(): Promise<CouponType[]> {
        return prisma.coupon.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' }
        });
    }

    async softDelete(id: number) {
        return prisma.coupon.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    async update(id: number, data: Prisma.CouponUpdateInput): Promise<CouponType> {
        return prisma.coupon.update({ where: { id }, data });
    }

    async restore(id: number): Promise<CouponType> {
        return prisma.coupon.update({
            where: { id },
            data: { deletedAt: null }
        });
    }
}