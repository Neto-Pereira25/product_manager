import type { Product, Filters } from '../store/productStore';

export function filterProducts(products: Product[], filters: Filters): Product[] {
    return products.filter((product) => {
        const nameMatch = filters.search
            ? product.name.toLowerCase().includes(filters.search.toLowerCase())
            : true;

        const price = product.price;
        const priceMatch =
            (filters.minPrice === undefined || Number(price) >= filters.minPrice) &&
            (filters.maxPrice === undefined || Number(price) <= filters.maxPrice);

        const hasDiscount = !!product.productDiscount;
        const discountMatch = filters.hasDiscount === undefined || filters.hasDiscount === hasDiscount;

        return nameMatch && priceMatch && discountMatch;
    });
}