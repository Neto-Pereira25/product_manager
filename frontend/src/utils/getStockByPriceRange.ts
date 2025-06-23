import type { Product } from '../store/productStore';

export function getStockByPriceRange(products: Product[]) {
    const ranges = {
        'Até R$ 50': { count: 0, totalStock: 0 },
        'R$ 51 a R$ 200': { count: 0, totalStock: 0 },
        'R$ 201 a R$ 500': { count: 0, totalStock: 0 },
        '501 de R$ 1000': { count: 0, totalStock: 0 },
        '1001 de R$ 2000': { count: 0, totalStock: 0 },
        'Acima de R$ 2000': { count: 0, totalStock: 0 },
    };

    products.forEach(product => {
        const price = parseFloat(product.price);
        if (price <= 50) {
            ranges['Até R$ 50'].count++;
            ranges['Até R$ 50'].totalStock += product.stock;
        } else if (price <= 200) {
            ranges['R$ 51 a R$ 200'].count++;
            ranges['R$ 51 a R$ 200'].totalStock += product.stock;
        } else if (price <= 500) {
            ranges['R$ 201 a R$ 500'].count++;
            ranges['R$ 201 a R$ 500'].totalStock += product.stock;
        } else if (price <= 1000) {
            ranges['501 de R$ 1000'].count++;
            ranges['501 de R$ 1000'].totalStock += product.stock;
        } else if (price <= 2000) {
            ranges['1001 de R$ 2000'].count++;
            ranges['1001 de R$ 2000'].totalStock += product.stock;
        } else {
            ranges['Acima de R$ 2000'].count++;
            ranges['Acima de R$ 2000'].totalStock += product.stock;
        }
    });

    return Object.entries(ranges).map(([range, data]) => ({
        range,
        quantity: data.count,
        stock: data.totalStock
    }));
}