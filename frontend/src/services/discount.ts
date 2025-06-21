import api from './api';

export const getActiveDiscounts = () => {
    return api.get('/api/v1/products/with-discounts/');
};