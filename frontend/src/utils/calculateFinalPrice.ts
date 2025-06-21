import type { Product } from '../store/productStore';

export function calculateFinalPrice(product: Product): number {
    const { price, productDiscount } = product;

    if (!productDiscount) return price;

    if (productDiscount.type === 'percent') {
        const percent = productDiscount.value ?? 0;
        return Math.max(price * (1 - percent / 100), 0.01);
    }

    if (productDiscount.type === 'coupon' && productDiscount.coupon) {
        const { type, value } = productDiscount.coupon;

        if (type === 'fixed') {
            return Math.max(price - value, 0.01);
        }

        if (type === 'percent') {
            return Math.max(price * (1 - value / 100), 0.01);
        }
    }

    return price;
}