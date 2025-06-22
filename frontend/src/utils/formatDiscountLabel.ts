import type { Product } from '../store/productStore';
import type { Coupon } from '../store/couponStore';

export function formatDiscountLabel(product: Product, coupons: Coupon[]): string | null {
    const discount = product.productDiscount;
    if (!discount || discount.value == null) return null;

    if (discount.type === 'percent') {
        return `-${discount.value}%`;
    }

    if (discount.type === 'coupon') {
        const coupon = coupons.find(c => c.id === discount.couponId);
        if (!coupon) return null;

        const value = Number(coupon.value);
        if (isNaN(value)) return null;

        if (coupon.type === 'percent') {
            return `-${value}%`;
        } else {
            return `-${value.toFixed(2)}`;
        }
    }

    return null;
}
