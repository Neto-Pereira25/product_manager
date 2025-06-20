import express, { Application } from 'express';
import cors from 'cors';
import homeRouter from './src/routes/home.router';
import productRouter from './src/routes/product.router';
import couponRouter from './src/routes/coupon.router';
import discountRouter from './src/routes/discount.router';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(cors());
        this.app.use('/api/v1/', homeRouter);
        this.app.use('/api/v1/products/', productRouter);
        this.app.use('/api/v1/coupons/', couponRouter);
        this.app.use('/api/v1/', discountRouter);
    }
}

export default new App().app;
