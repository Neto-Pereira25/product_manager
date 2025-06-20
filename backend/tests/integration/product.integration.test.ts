import { ProductService } from '../../src/services/ProductService';
import { ProductRepository } from '../../src/repositories/ProductRepository';
import { prisma } from '../../src/config/prisma';

const service = new ProductService();
const repository = new ProductRepository();

describe('ProductService - Integration Test', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        const product = await repository.findByNormalizedName('produto teste');

        if (product) {
            await prisma.product.delete({
                where: { id: product.id }
            });
        }

        await prisma.$disconnect();
    });

    it('must create a new valid product', async () => {
        const product = await service.createProduct({
            name: 'Produto Teste',
            description: 'Exemplo',
            stock: 10,
            price: 100.0,
        });

        expect(product).toHaveProperty('id');
        expect(product.name).toBe('produto teste');
    });

    it('must fail to create duplicate product', async () => {
        try {
            const product = await service.createProduct({
                name: 'Produto Teste',
                description: 'Repetido',
                stock: 10,
                price: 100.0
            });

            expect(product).toHaveProperty('id');
            expect(product.name).toBe('produto teste');
        } catch (e: any) {
            expect(e.status).toBe(409)
        }
    });

    it('must update product successfully', async () => {
        const products = await service.listProducts();
        const product = products[0];

        const updated = await service.updateProduct(product.id, {
            description: 'Atualizado',
            stock: 20,
        });

        expect(updated.stock).toBe(20);
        expect(updated.description).toEqual('Atualizado');
    });

    it('must delete and restore the product', async () => {
        const product = (await service.listProducts())[0];

        await service.softDeleteProduct(product.id);
        const deleted = await service.getProduct(product.id);
        expect(deleted.deletedAt).not.toBeNull();

        const restored = await service.restoreProduct(product.id);
        expect(restored.deletedAt).toBeNull();
    });
});
