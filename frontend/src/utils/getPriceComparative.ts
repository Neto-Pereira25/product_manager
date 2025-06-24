import type { Product } from '../store/productStore';
import { calculateFinalPrice } from './calculateFinalPrice';

export function getPriceComparative(products: Product[]) {
    const totalProducts = products.length;

    if (totalProducts === 0) return {
        originalAvg: 0,
        finalAvg: 0,
        discountAvg: 0,
        discountPercent: 0,
    };

    const totalOriginal = products.reduce((acc, p) => acc + parseFloat(p.price), 0);
    const totalFinal = products.reduce((acc, p) => acc + calculateFinalPrice(p), 0);

    const originalAvg = totalOriginal / totalProducts;
    const finalAvg = totalFinal / totalProducts;
    const discountAvg = originalAvg - finalAvg;
    const discountPercent = (discountAvg / originalAvg) * 100;

    return {
        originalAvg,
        finalAvg,
        discountAvg,
        discountPercent,
    };
}