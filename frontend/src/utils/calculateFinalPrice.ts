import type { Product } from '../store/productStore';

export function calculateFinalPrice(product: Product): number {
    const price = parseFloat(product.price);
    const discount = product.productDiscount;

    if (isNaN(price) || !discount) return price;

    if (discount.type === 'percent') {
        const percentage = discount.value ?? 0;
        return Math.max(price * (1 - percentage / 100), 0.01);
    }

    if (discount.type === 'coupon' && discount.value !== undefined) {
        return Math.max(price - discount.value, 0.01);
    }

    return price;
}