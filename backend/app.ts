import express, { Application } from 'express';
import cors from 'cors';
import homeRouter from './src/routes/homeRouter';

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
        this.app.use('/api/', homeRouter);
    }
}

export default new App().app;
