import { ProductService } from '../../src/services/ProductService';

describe('ProductService - Unit Test', () => {
    const mockRepo = {
        findByNormalizedName: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        softDelete: jest.fn(),
        restore: jest.fn(),
        list: jest.fn(),
    };

    const service = new ProductService(mockRepo as any);

    it('must create product if name is unique', async () => {
        mockRepo.findByNormalizedName.mockReturnValue(null);
        mockRepo.create.mockReturnValue({ id: 1, name: 'produto teste' });

        const result = await service.createProduct({
            name: 'Produto Teste',
            description: 'Repetido',
            stock: 10,
            price: 100.0
        });

        expect(mockRepo.create).toHaveBeenCalled();
        expect(result.id).toBe(1);
    });

    it('must reject creation with duplicate name', async () => {
        mockRepo.findByNormalizedName.mockReturnValue({ id: 99 });

        await expect(
            service.createProduct({
                name: 'Produto Teste',
                description: 'Repetido',
                stock: 10,
                price: 100.0
            })
        ).rejects.toEqual({
            status: 409,
            message: 'Recurso já existe na base de dados'
        });
    });
});
