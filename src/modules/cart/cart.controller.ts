import CrudController from "../../common/controllers/crud.controller";
import {Request, Response} from "express";
import User from "../user/user.model";
import cartService from "./cart.service";
import Cart from "./cart.model";

export class CartController extends CrudController {

  public service = cartService;

  public fetchUserCart = async (req: Request, res: Response) => {
    try {
      const user : User  = res.locals.authUser
      let cart = await this.service.findOne({ user, active: true}, ['items']);

      //
      this.returnData(res, {
        message: 'User Cart fetched Successfully',
        data: cart
      })
    }
    catch (err) {
        this.returnServerError(res, err);
    }
  }

  public addItemToCart = async (req: Request, res: Response) => {

    try {
      const cartItem: Cart = req.body;
      const user : User  = res.locals.authUser

      let cart : Cart = await this.service.addItemToCart(user, cartItem);
      if (cart) {
        cart = await this.service.get(cart._id);
        this.returnCreated(
          res, cart,
          `Cart Item created successfully!`
        );
      }

      this.returnBadRequest(res,
        `Error creating ${this.service.modelName}`);
    }
    catch (err) {
      this.returnServerError(res, err);
    }
  }

  public addItemsToCart = async (req: Request, res: Response) => {

    try {
      const cartItems : Cart[] = req.body.items;
      const user: User  = res.locals.authUser

      for(const element of cartItems) {
        let cart = element;
        await this.service.addItemToCart(user, cart)
      }

      //
      let cart = await this.service.findOne({ user, active: true }, ['items']);
      this.returnCreated(res, cart, `Cart Items added successfully!`);
    }
    catch (err) {
      this.returnServerError(res, err);
    }
  }

  public deleteCartItem = async (req: Request, res: Response) => {

    try {
        const cartItemId = req.params.id;
        const user : User  = res.locals.authUser

        /**
         * Confirm if user added the item
         */
        let cart = await this.service.removeFromCart(user, cartItemId)

        this.returnOk(
          res, cart,
          `Cart item deleted successfully!`
        );
    }
    catch (err) {
      this.returnServerError(res, err);
    }
  }
}

export default new CartController();