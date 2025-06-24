import type { Coupon } from '../store/couponStore';
import type { Product } from '../store/productStore';
import { calculateFinalPrice } from './calculateFinalPrice';

export function getCouponEffectiveness(products: Product[], coupons: Coupon[]) {
    const results: {
        code: string;
        type: 'percent' | 'fixed';
        uses: number;
        totalDiscount: number
    }[] = [];

    for (const coupon of coupons) {
        const relatedProducts = products.filter(p => {
            return p.productDiscount?.type === 'coupon' &&
                p.productDiscount.couponId === coupon.id;
        });

        if (relatedProducts.length > 0) {
            const totalDiscount = relatedProducts.reduce((acc, p) => {
                const original = parseFloat(p.price);
                const final = calculateFinalPrice(p);
                return acc + (original - final);
            }, 0);

            results.push({
                code: coupon.code,
                type: coupon.type,
                uses: relatedProducts.length,
                totalDiscount,
            });
        }
    }

    return results;
}