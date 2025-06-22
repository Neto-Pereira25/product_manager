import type { ProductFormData } from '../schemas/productSchema';
import api from './api';

export const getProducts = () => {
    return api.get('/api/v1/products/');
};

export const createProduct = (data: ProductFormData) => {
    return api.post('/api/v1/products', data);
};

export const updateProduct = (id: number, data: ProductFormData) => {
    return api.put(`/api/v1/products/${id}`, data);
};