import type { Coupon } from '../store/couponStore';
import type { Product } from '../store/productStore';
import { calculateFinalPrice } from './calculateFinalPrice';

type DiscountImpact = {
    type: 'percent' | 'fixed',
    label: string;
    count: number;
    averageDiscount: number;
    totalSaved: number;
};

export function getDiscountImpact(products: Product[], coupons: Coupon[]): DiscountImpact[] {
    const result: Record<'percent' | 'fixed', {
        count: number;
        total: number;
        totalSaved: number
    }> = {
        percent: { count: 0, total: 0, totalSaved: 0 },
        fixed: { count: 0, total: 0, totalSaved: 0 },
    };

    for (const product of products) {
        const discount = product.productDiscount;

        if (!discount) continue;

        const price = parseFloat(product.price);
        const finalPrice = calculateFinalPrice(product);
        const stock = product.stock || 0;
        const discountValue = price - finalPrice;

        if (discount.type === 'percent') {
            result.percent.count += 1;
            result.percent.total += discountValue;
            result.percent.totalSaved += discountValue * stock;
        } else {
            const coupon = coupons.find(c => c.id === discount.couponId);

            if (coupon?.type === 'fixed') {
                result.fixed.count += 1;
                result.fixed.total += discountValue;
                result.fixed.totalSaved += discountValue * stock;
            }
        }
    }

    return [
        {
            type: 'percent',
            label: 'Desconto Percentual',
            count: result.percent.count,
            averageDiscount: result.percent.count > 0 ? result.percent.total / result.percent.count : 0,
            totalSaved: result.percent.totalSaved
        },
        {
            type: 'fixed',
            label: 'Cupom Fixo',
            count: result.fixed.count,
            averageDiscount: result.fixed.count > 0 ? result.fixed.total / result.fixed.count : 0,
            totalSaved: result.fixed.totalSaved
        }
    ];
}