import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const homeRouter = Router();

homeRouter.get('/', HomeController);

export default homeRouter;
