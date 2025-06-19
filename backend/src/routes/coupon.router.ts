import { Router } from 'express';
import { CouponController } from '../controllers/CouponController';

const couponRouter = Router();
const controller = new CouponController();

couponRouter.post('/', controller.create);
couponRouter.get('/', controller.list);
couponRouter.get('/:id', controller.getById);
couponRouter.put('/:id', controller.update);
couponRouter.delete('/:id', controller.remove);

export default couponRouter;