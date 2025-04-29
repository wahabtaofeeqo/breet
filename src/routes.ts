import { Router } from "express";
import authRouter from "./modules/auth/auth.router";
import productRouter from "./modules/product/product.router";
import cartRouter from "./modules/cart/cart.router";
import orderRouter from "./modules/order/order.router";

export class ApiRoute {

    public router = Router();
    public constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.initApi();    
    }

    private initApi = (): void => {
        this.router.use('/auth', authRouter);
        this.router.use("/cart", cartRouter);
        this.router.use("/orders", orderRouter);
        this.router.use('/products', productRouter)
    }
}

export default new ApiRoute().router

