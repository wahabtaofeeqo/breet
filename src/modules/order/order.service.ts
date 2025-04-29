import {OrderModel} from "./order.model";
import Cart from "../cart/cart.model";
import {CrudService} from "../../common/services/crud.service";
import User from "../user/user.model";
import cartService from "../cart/cart.service";
import { throwError } from "../../utils/helpers";
import { OrderPaymentStatus, OrderStatus } from "./order.schema";
import productService from "../product/product.service";
import Product from "../product/product.model";

class OrderService extends CrudService {

  public model = OrderModel;
  public modelName = 'Order';
  private cartService = cartService;
  private productService = productService

  public async createOrder(cart: Cart, user: User, body): Promise<any> {
    try {

        let items = cart.items;

        // Check for out of stock
        for (let item of cart.items) {
            let product: Product = await this.productService.get(item.product);
            if(product.stockQuantity < item.quantity) { // Remove from the cart (Notify user of this: Out of stock)
                items = items.filter(ci => ci.product.toString() != item.product.toString())
                await this.cartService.removeFromCart(user, product.id)
            }
        }

        if(!items.length) return throwError("Cart is empty", 400)

        let order = await this.updateWhere({ cart }, {
            cart, user, ...body,
            paymentStatus: OrderPaymentStatus.PAID,
            status: OrderStatus.DELIVERED // For Demo purposes
        }, {upsert: true})

        // Disativate the cart
        await this.cartService.update(cart.id, {
            ...cart,
            active: false
        })

        //
        return order;
    }
    catch (e) {
      throwError(e.message, e.code)
    }
  }
}

export default new OrderService();