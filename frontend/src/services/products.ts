import api from './api';

export const getProducts = () => {
    return api.get('http://localhost:3000/api/v1/products/');
};