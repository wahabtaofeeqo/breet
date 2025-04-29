import { Router } from "express";
import productController from "./product.controller";

export class ProductRouter {
  public router: Router = Router();

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router.get("/", productController.index);
  }
}

export default new ProductRouter().router;