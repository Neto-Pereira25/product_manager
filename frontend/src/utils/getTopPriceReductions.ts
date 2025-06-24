import type { Product } from '../store/productStore';
import { calculateFinalPrice } from './calculateFinalPrice';

export function getTopPriceReductions(products: Product[], limit = 5) {
    return products
        .filter(p => p.productDiscount)
        .map(p => {
            const original = parseFloat(p.price);
            const final = calculateFinalPrice(p);
            const reduction = original - final;

            return {
                name: p.name,
                originalPrice: original.toFixed(2),
                finalPrice: final.toFixed(2),
                reduction: reduction.toFixed(2)
            };
        })
        .sort((a, b) => parseFloat(b.reduction) - parseFloat(a.reduction))
        .slice(0, limit);
}