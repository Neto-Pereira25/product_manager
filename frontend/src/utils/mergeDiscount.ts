import type { Product, ProductDiscount } from '../store/productStore';

type DiscountAPI = {
    id: number;
    productId: number;
    type: 'percent' | 'coupon';
    value: number;
    couponId: number | null;
    appliedAt: string;
    removedAt: string | null;
};

export function mergeDiscountWithProducts(products: Product[], discounts: DiscountAPI[]): Product[] {
    const discountMap = new Map<number, ProductDiscount>();

    for (const d of discounts) {
        if (d.removedAt === null) {
            discountMap.set(d.productId, {
                type: d.type,
                value: d.value,
                couponId: d.couponId
            });
        }
    }

    return products.map((p) => ({
        ...p,
        productDiscount: discountMap.get(p.id)
    }));
}