import { Router } from "express";
import validateMiddleware from "../../middleware/validate.middleware";
import authMiddleware from "../../middleware/auth.middleware";
import cartController from "./cart.controller";
import cartValidator from "./cart.validator";
const { validate } = validateMiddleware;

export class CartRoute {

  public router: Router = Router();
  public controller = cartController;

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router
      .get(
        "/items",
        authMiddleware.verifyAuth(),
        this.controller.fetchUserCart
      )
      .post(
        "/item",
        authMiddleware.verifyAuth(),
        validate(cartValidator.addItemToCart),
        this.controller.addItemToCart
      )
      .post(
        "/items",
        authMiddleware.verifyAuth(),
        validate(cartValidator.addItemsToCart),
        this.controller.addItemsToCart
      )
      .delete(
        "/items/:id",
        authMiddleware.verifyAuth(),
        this.controller.deleteCartItem
      )
  }
}

export default new CartRoute().router;