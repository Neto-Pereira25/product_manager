import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

import { ProductType } from '../types/ProductType';
import { normalizeString } from '../utils/normalize';

export class ProductRepository {
    async findById(id: number): Promise<ProductType | null> {
        return prisma.product.findUnique({ where: { id } });
    }

    async findByNormalizedName(name: string): Promise<ProductType | null> {
        const normalized = normalizeString(name);
        return prisma.product.findFirst({
            where: {
                name: {
                    equals: normalized,
                    mode: 'insensitive'
                }
            }
        });
    }

    async create(data: Prisma.ProductCreateInput): Promise<ProductType> {
        return prisma.product.create({ data });
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<ProductType> {
        return prisma.product.update({ where: { id }, data });
    }

    async softDelete(id: number): Promise<ProductType> {
        return prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }

    async restore(id: number): Promise<ProductType> {
        return prisma.product.update({
            where: { id },
            data: { deletedAt: null }
        });
    }

    async list(filters: any): Promise<ProductType[]> {
        return prisma.product.findMany({
            where: { deletedAt: filters.includeDeleted ? undefined : null },
            orderBy: {
                createdAt: 'desc'
            },
        });
    }


}