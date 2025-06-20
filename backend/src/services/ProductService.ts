import { StatusCodes } from 'http-status-codes';
import { Decimal } from '@prisma/client/runtime/library';

import { ProductRepository } from '../repositories/ProductRepository';
import { CreateProductDTO } from '../schemas/product.schema';
import { normalizeString } from '../utils/normalize';
import { ProductType } from '../types/ProductType';
import { standardHttpMessage } from '../utils/standardHttpMessage';

export class ProductService {

    constructor(
        private productRepository: ProductRepository = new ProductRepository()
    ) { }

    async createProduct(data: CreateProductDTO): Promise<ProductType> {
        const normalizedName = normalizeString(data.name);

        const existing = await this.productRepository.findByNormalizedName(normalizedName);

        if (existing) {
            if (existing.deletedAt !== null) {
                const product = await this.restoreProduct(existing.id);

                throw {
                    status: StatusCodes.OK,
                    message: {
                        obs: 'Produto restaurado com sucesso',
                        product,
                    },
                };
            }
            throw standardHttpMessage.CONFLICT;
        }

        if (data.price < 0.01) {
            throw standardHttpMessage.UNPROCESSABLE_ENTITY;
        }

        const createdProdut = await this.productRepository.create({
            ...data,
            name: normalizedName,
            createdAt: new Date(),
        });

        return createdProdut;
    }

    async getProduct(id: number): Promise<ProductType> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw standardHttpMessage.NOT_FOUND;
        }

        return product;
    }

    async updateProduct(id: number, data: Partial<CreateProductDTO>): Promise<ProductType> {
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw standardHttpMessage.NOT_FOUND;
        }

        if (data.name) {
            const normalized = normalizeString(data.name);
            const conflict = await this.productRepository.findByNormalizedName(normalized);
            if (conflict && conflict.id !== id) {
                throw standardHttpMessage.CONFLICT;
            }
            data.name = normalized;
        }

        if (data.price && data.price < 0.01) {
            throw standardHttpMessage.UNPROCESSABLE_ENTITY;
        }

        const updated = await this.productRepository.update(id, {
            ...data,
            updatedAt: new Date(),
        });

        return updated;
    }

    async softDeleteProduct(id: number): Promise<void> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw standardHttpMessage.NOT_FOUND;
        }

        await this.productRepository.softDelete(id);
    }

    async restoreProduct(id: number): Promise<ProductType> {
        const product = await this.productRepository.findById(id);

        if (!product || product.deletedAt === null) {
            throw standardHttpMessage.NOT_FOUND;
        }

        return await this.productRepository.restore(id);
    }

    async listProducts(): Promise<ProductType[]> {
        return this.productRepository.list({});
    }
}