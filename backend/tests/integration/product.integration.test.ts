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
});
