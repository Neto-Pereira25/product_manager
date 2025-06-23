import type { Product } from '../store/productStore';
import { calculateFinalPrice } from './calculateFinalPrice';

export function getPriceComparison(products: Product[]) {
    return products.map(p => ({
        name: p.name.length > 20 ? p.name.slice(0, 20) + '…' : p.name,
        original: parseFloat(p.price),
        final: calculateFinalPrice(p)
    }));
}