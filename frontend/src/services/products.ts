import api from './api';

export const getProducts = () => {
    return api.get('/api/v1/products');
};