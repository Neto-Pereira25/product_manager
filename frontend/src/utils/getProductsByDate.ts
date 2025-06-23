import type { Product } from '../store/productStore';

export function getProductsByDate(products: Product[]) {
    const counts: Record<string, number> = {};

    products.forEach(p => {
        const date = new Date(p.createdAt).toLocaleDateString('pt-BR');
        counts[date] = (counts[date] || 0) + 1;
    });

    return Object.entries(counts).map(([date, count]) => ({
        date,
        count
    }));
}