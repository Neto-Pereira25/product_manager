import type { Coupon } from '../store/couponStore';

export function getValidCoupons(coupons: Coupon[]): Coupon[] {
    const now = new Date();

    return coupons.filter(coupon => {
        const from = new Date(coupon.validFrom);
        const until = new Date(coupon.validUntil);

        const inPeriod = from <= now && now <= until;
        const underLimit = coupon.maxUses == null || coupon.usesCount < coupon.maxUses;
        const notDeleted = !('deletedAt' in coupon) || coupon.deletedAt === null;

        return inPeriod && underLimit && notDeleted;
    });
}
