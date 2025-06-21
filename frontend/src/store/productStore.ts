import { create } from 'zustand';
import { getProducts } from '../services/products';
import { filterProducts } from '../utils/filterProducts';
import { paginate } from '../utils/paginate';

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

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    filteredProducts: [],
    paginatedProducts: [],
    loading: false,
    filters: {
        search: '',
        minPrice: undefined,
        maxPrice: undefined,
        hasDiscount: undefined
    },
    page: 1,
    totalPages: 1,
    itemsPerPage: 10,

    setFilters: (filters) => {
        set((state) => {
            const newFilters = { ...state.filters, ...filters };
            const filtered = filterProducts(state.products, newFilters);
            const pages = Math.max(1, Math.ceil(filtered.length / state.itemsPerPage));
            return {
                filters: newFilters,
                filteredProducts: filtered,
                page: 1,
                totalPages: pages,
                paginatedProducts: paginate(filtered, 1, state.itemsPerPage)
            };
        });
    },

    setPage: (page) => set({ page }),

    fetchProducts: async () => {
        set({ loading: true });

        try {
            const { data } = await getProducts();
            const filtered = filterProducts(data, get().filters);
            const page = Math.max(1, Math.ceil(filterProducts.length / get().itemsPerPage));
            set({
                products: data,
                filteredProducts: filtered,
                totalPages: page,
                paginatedProducts: paginate(filtered, 1, get().itemsPerPage),
                page: 1
            });
        } catch (e: any) {
            console.log('Erro ao buscar produtos', e);
        } finally {
            set({ loading: false });
        }
    }
}));
