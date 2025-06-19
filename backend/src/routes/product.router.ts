import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const productRouter = Router();
const controller = new ProductController();

productRouter.post('/', controller.create);
productRouter.get('/', controller.list);
productRouter.get('/:id', controller.getById);
productRouter.put('/:id', controller.update);
productRouter.delete('/:id', controller.softDelete);
productRouter.post('/:id/restore', controller.restore);

export default productRouter;