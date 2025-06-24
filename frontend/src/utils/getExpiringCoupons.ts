import type { Product } from '../store/productStore';
import type { Coupon } from '../store/couponStore';

export function getExpiringCoupons(products: Product[], coupons: Coupon[]) {
    const now = new Date();
    const inSevenDays = new Date();
    inSevenDays.setDate(now.getDate() + 7);

    return products
        .filter(p => p.productDiscount?.type === 'coupon' && p.productDiscount.couponId)
        .map(p => {
            const coupon = coupons.find(c => c.id === p.productDiscount?.couponId);
            if (!coupon || !coupon.validUntil) return null;

            const expiryDate = new Date(coupon.validUntil);
            if (expiryDate >= now && expiryDate <= inSevenDays) {
                return {
                    productName: p.name,
                    couponCode: coupon.code,
                    expiresAt: expiryDate,
                };
            }

            return null;
        })
        .filter((item): item is { productName: string; couponCode: string; expiresAt: Date } => item !== null)
        .sort((a, b) => a.expiresAt.getTime() - b.expiresAt.getTime());
}