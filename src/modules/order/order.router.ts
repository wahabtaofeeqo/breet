import { Router } from "express";
import OrderValidator from "./order.validator";
import validateMiddleware from "../../middleware/validate.middleware";
import authMiddleware from "../../middleware/auth.middleware";
import orderController from "./order.controller";

const { validate } = validateMiddleware;

export class OrderRoute {

  public router: Router = Router();
  public controller = orderController;

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router
      .get(
        "/",
        authMiddleware.verifyAuth(),
        this.controller.fetchUserOrders
      )
      .post(
        "/",
        authMiddleware.verifyAuth(),
        validate(OrderValidator.createOrder),
        this.controller.createOrder
      )
      .get(
        "/:id",
        authMiddleware.verifyAuth(),
        this.controller.getOrder
      );
  }
}

export default new OrderRoute().router;