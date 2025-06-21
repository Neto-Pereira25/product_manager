import { create } from 'zustand';
import { getProducts } from '../services/products';
import { filterProducts } from '../utils/filterProducts';
import { paginate } from '../utils/paginate';
import { persist } from 'zustand/middleware';

export type Coupon = {
    code: string;
    type: 'fixed' | 'percent';
    value: number;
    validFrom: string;
    validUntil: string;
};

export type ProductDiscount = {
    type: 'percent' | 'coupon';
    value?: number;
    coupon?: Coupon;
};

export type Product = {
    id: number;
    name: string;
    description?: string;
    stock: number;
    price: number;
    createAt: string;
    updateAt?: string;
    deletedAt?: string | null;
    productDiscount?: ProductDiscount | null;
};

export type Filters = {
    search: string;
    minPrice?: number;
    maxPrice?: number;
    hasDiscount?: boolean;
};

interface ProductStore {
    products: Product[];
    filteredProducts: Product[];
    paginatedProducts: Product[];
    loading: boolean;
    filters: Filters;
    page: number;
    itemsPerPage: number;
    totalPages: number;

    setFilters: (filters: Partial<Filters>) => void;
    setPage: (page: number) => void;
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: [],
            filteredProducts: [],
            paginatedProducts: [],
            filters: {
                search: '',
                minPrice: undefined,
                maxPrice: undefined,
                hasDiscount: undefined
            },
            page: 1,
            itemsPerPage: 10,
            totalPages: 1,
            loading: false,

            setFilters: (filters) => {
                const state = get();
                const newFilters = { ...state.filters, ...filters };
                const filtered = filterProducts(state.products, newFilters);
                const pages = Math.max(1, Math.ceil(filtered.length / state.itemsPerPage));
                set({
                    filters: newFilters,
                    filteredProducts: filtered,
                    totalPages: pages,
                    page: 1,
                    paginatedProducts: paginate(filtered, 1, state.itemsPerPage)
                });
            },

            setPage: (page) => {
                const { filteredProducts, itemsPerPage } = get();
                const pages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
                set({
                    page,
                    totalPages: pages,
                    paginatedProducts: paginate(filteredProducts, page, itemsPerPage)
                });
            },

            fetchProducts: async () => {
                set({ loading: true });
                try {
                    const { data } = await getProducts();
                    const state = get();
                    const filtered = filterProducts(data, state.filters);
                    const pages = Math.max(1, Math.ceil(filtered.length / state.itemsPerPage));
                    set({
                        products: data,
                        filteredProducts: filtered,
                        totalPages: pages,
                        paginatedProducts: paginate(filtered, 1, state.itemsPerPage),
                        page: 1
                    });
                } catch (error) {
                    console.error('Erro ao buscar produtos:', error);
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {
            name: 'product-store',
            partialize: (state) => ({
                // Persistiremos apenas o necessário
                products: state.products,
                filteredProducts: state.filteredProducts,
                paginatedProducts: state.paginatedProducts,
                filters: state.filters,
                page: state.page,
                itemsPerPage: state.itemsPerPage,
                totalPages: state.totalPages
            })
        }
    )
);
