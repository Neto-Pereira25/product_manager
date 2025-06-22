import { create } from 'zustand';
import { getAllCoupons } from '../services/coupons';

export type Coupon = {
    id: number;
    code: string;
    type: 'fixed' | 'percent';
    value: number;
    oneShot: boolean;
    maxUses?: number | null;
    usesCount: number;
    validFrom: string;
    validUntil: string;
};

interface CouponStore {
    coupons: Coupon[];
    loading: boolean;
    fetchCoupons: () => Promise<void>;
}

export const useCouponStore = create<CouponStore>((set) => ({
    coupons: [],
    loading: false,

    fetchCoupons: async () => {
        set({ loading: true });
        try {
            const res = await getAllCoupons();
            const normalized = res.data.map((c: any) => ({
                ...c,
                value: Number(c.value),
                maxUses: c.maxUses !== null ? Number(c.maxUses) : null
            }));
            set({ coupons: normalized });
        } catch (error) {
            console.error('Erro ao buscar cupons:', error);
        } finally {
            set({ loading: false });
        }
    }
}));
