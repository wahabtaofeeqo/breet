import CrudController from "../../common/controllers/crud.controller";
import { Request, Response } from "express";
import User from "../user/user.model";
import CartService from "../cart/cart.service"
import Cart from "../cart/cart.model";
import orderService from "./order.service";
import Order from "./order.model";

export class OrderController extends CrudController {

  public service = orderService;
  public cartService = CartService;

  public fetchUserOrders = async (req: Request, res: Response) => {
    try {
      const user: User = res.locals.authUser
      const options = await this.buildOptions(req.query);
      let orders: Order[] = await this.service.all(options, {
        user,
      }, ['cart']);

      this.returnData(res, {
        message: 'User Orders fetched Successfully',
        data: orders
      })

    }
    catch (err) {
      this.returnServerError(res, err);
    }
  }

  public getOrder = async (req: Request, res: Response) => {

    try {
        const { id: orderId } = req.params;
        let order: Order = await this.service.get(orderId, ['cart']);
        if(!order) {
            this.returnNotFound(res, "Order not found")
        }

        this.returnData(res, {
            message: 'Order Fetched successfully!',
            data: order
        })
    }
    catch (err) {
        this.returnServerError(res, err);
    }
  }

  public createOrder = async (req: Request, res: Response) => {

    try {
      const body = req.body;
      const user: User = res.locals.authUser

      let cart: Cart = await this.cartService.get(body.cart, ['items']);
      if (cart.items.length <= 0) {
        this.returnBadRequest(res, `No Items In Cart`);
      }

      let order = await this.service.createOrder(cart, user, body);
      this.returnData(res, {
        message: 'Order created successfully!', order
      })
    }
    catch (err) {
      this.returnServerError(res, err);
    }
  }
}

export default new OrderController();