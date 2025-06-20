import { StatusCodes } from 'http-status-codes';
import { prisma } from '../config/prisma';
import { ProductDiscountRepository } from '../repositories/ProductDiscountRepository';
import { normalizeString } from '../utils/normalize';
import { standardHttpMessage } from '../utils/standardHttpMessage';

export class ProductDiscountService {

    private productDiscountRepository = new ProductDiscountRepository();

    async applyPercentDiscount(productId: number, percent: number) {
        if (percent < 1 || percent > 80) {
            throw {
                status: StatusCodes.UNPROCESSABLE_ENTITY,
                message: 'Desconto percentual deve estar entre 1% e 80%'
            };
        }

        const existing = await this.productDiscountRepository.findActiveByProductId(productId);
        if (existing) {
            throw {
                status: StatusCodes.CONFLICT,
                message: 'O produto já possui um desconto ativo',
            };
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw standardHttpMessage.NOT_FOUND;

        const priceWithDiscount = product.price.toNumber() * (1 - percent / 100);
        if (priceWithDiscount < 0.01) {
            throw {
                status: StatusCodes.UNPROCESSABLE_ENTITY,
                message: 'Desconto resultaria em valor inválido (< R$ 0,01)'
            };
        }

        return await this.productDiscountRepository.createPercentDiscount(productId, percent);
    }

    async applyCouponDiscount(productId: number, code: string) {
        const normalized = normalizeString(code);

        const coupon = await this.productDiscountRepository.findCouponByCode(normalized);

        if (!coupon) throw standardHttpMessage.NOT_FOUND;

        const now = new Date();
        if (now < coupon.validFrom || now > coupon.validUntil) {
            throw {
                status: StatusCodes.BAD_REQUEST,
                message: 'Cupom fora da validade'
            };
        }

        const existingDiscount = await this.productDiscountRepository.findActiveByProductId(productId);

        if (existingDiscount && !existingDiscount.removedAt) {
            throw {
                status: StatusCodes.CONFLICT,
                message: 'Produto já possui desconto ativo'
            };
        }

        if (coupon.oneShot) {
            const appliedBefore = await this.productDiscountRepository.findHistoricalByProductAndCoupon(productId, coupon.id);

            if (appliedBefore) {
                throw {
                    status: StatusCodes.CONFLICT,
                    message: 'Cupom já foi utilizado neste produto'
                }
            }
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product) throw standardHttpMessage.NOT_FOUND;

        const discountValue = coupon.type === 'percent'
            ? product.price.toNumber() * (coupon.value.toNumber() / 100)
            : coupon.value.toNumber();

        if (product.price.toNumber() - discountValue < 0.01) {
            throw {
                status: StatusCodes.UNPROCESSABLE_ENTITY,
                message: 'Desconto deixaria o produto com valor inválido (< R$ 0,01)'
            };
        }

        return await prisma.$transaction(async (tx) => {
            await this.productDiscountRepository.incrementCouponUsage(coupon.id, tx);
            return this.productDiscountRepository.createCouponDiscount(productId, coupon.id, tx);
        });

    }

    async removeDiscount(productId: number) {
        const active = await this.productDiscountRepository.findActiveByProductId(productId);

        if (!active) {
            throw {
                status: StatusCodes.NOT_FOUND,
                message: 'Nenhum desconto ativo encontrado para este produto',
            };
        }

        return await this.productDiscountRepository.updateToRemoved(active.id);
    }

    async findDiscount(productId: number) {
        const discount = await this.productDiscountRepository.findActiveByProductId(productId);

        if (!discount) {
            throw {
                status: StatusCodes.NOT_FOUND,
                message: 'Nenhum desconto ativo encontrado para este produto ou cupon',
            };
        }

        return discount;
    }
}