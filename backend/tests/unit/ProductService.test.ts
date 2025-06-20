import { ProductService } from '../../src/services/ProductService';

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

describe('ProductService - Unit Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

    it('must update product if exists', async () => {
        mockRepo.findById.mockReturnValue({ id: 1, name: 'produto' });
        mockRepo.findByNormalizedName.mockReturnValue(null);
        mockRepo.update.mockReturnValue({ id: 1, stock: 99 });

        const result = await service.updateProduct(1, { stock: 99 });
        expect(result.stock).toBe(99);
    });

    it('should throw error when trying to update non-existent product', async () => {
        mockRepo.findById.mockResolvedValue(null);

        await expect(service.updateProduct(123, { stock: 50 })).rejects.toEqual({
            status: 404,
            message: 'Recurso não encontrado',
        });

        expect(mockRepo.update).not.toHaveBeenCalled();
    });


    it('should throw error when trying to delete non-existent product', async () => {
        mockRepo.findById.mockReturnValue(null);

        await expect(service.softDeleteProduct(1233)).rejects.toEqual({
            status: 404,
            message: 'Recurso não encontrado',
        });
    });

    it('must delete existing product', async () => {
        mockRepo.findById.mockResolvedValue({ id: 1, name: 'produto' });
        mockRepo.softDelete.mockResolvedValue(undefined); // pode até omitir

        await service.softDeleteProduct(1);

        expect(mockRepo.softDelete).toHaveBeenCalledWith(1);
    });
});
