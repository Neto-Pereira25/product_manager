import type { Product } from '../store/productStore';
import { calculateFinalPrice } from './calculateFinalPrice';

export function getHighStockDiscountedProducts(products: Product[], limit = 5) {
    return products
        .filter(p => p.productDiscount)
        .sort((a, b) => b.stock - a.stock)
        .slice(0, limit)
        .map(p => {
            const price = parseFloat(p.price);
            const finalPrice = calculateFinalPrice(p);
            const discountPercent = price > 0 ? ((price - finalPrice) / price) * 100 : 0;

            return {
                name: p.name,
                stock: p.stock,
                discountType: p.productDiscount?.type === 'coupon' ? 'Cupom FIXO' : `Percentual (${p.productDiscount?.value})`,
                finalPrice: finalPrice.toFixed(2),
                discountPercent: `${discountPercent.toFixed(0)}`
            };
        });
}