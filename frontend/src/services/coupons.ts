import api from './api';

export const getAllCoupons = () => {
    return api.get('/api/v1/coupons');
};
