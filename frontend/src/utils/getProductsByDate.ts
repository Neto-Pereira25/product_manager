import type { Product } from '../store/productStore';

export function getProductsByDate(products: Product[]) {
    const counts: Record<string, number> = {};

    products.forEach(p => {
        const dateObj = new Date(p.createdAt);
        const date = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
        counts[date] = (counts[date] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}