import { Router } from 'express';
import { ProductDiscountController } from '../controllers/ProductDiscountController';

const discountRouter = Router();
const controller = new ProductDiscountController();

discountRouter.post('/products/:id/discount/percent', controller.applyPercent);
discountRouter.post('/products/:id/discount/coupon', controller.applyCoupon);
discountRouter.delete('/products/:id/discount', controller.remove);

export default discountRouter;
