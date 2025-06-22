import api from './api';

export const getActiveDiscounts = () => {
    return api.get('/api/v1/products/with-discounts/');
};

export const removeDiscount = (productId: number) => {
    return api.post(`/api/v1/products/${productId}/discount`);
};