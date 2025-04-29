
import logger from "../../../config/logger";
import {CrudService} from "../../common/services/crud.service";
import { throwError } from "../../utils/helpers";
import Product from "../product/product.model";
import productService from "../product/product.service";
import User from "../user/user.model";
import { CartModel } from "./cart.model";

class CartService extends CrudService {

    public model = CartModel;
    public modelName = 'Cart';
    private productService = productService

    public async addItemToCart(user: User, item: any): Promise<any> {
        try {
            const id = item.product
            const model: Product = await this.productService.get(id)
    
            /**
             * Check availability
             */
            if (!model) throwError('Invalid product ID', 404)
            if (!model.active) throwError('Product is not currently available', 400)
    
            /**
             * Check quantity
             */
            if(model.stockQuantity < item.quantity) 
                throwError("There's no enough product at the moment", 400)
    
            /**
             * Get User Active Cart
             */
            let cart = await this.findOne({ user, active: true }, ['items']);
            cart ??= new CartModel({ user, items: [], active: true }); // Create cart
    
            // Check Item
            const cartItem = cart.items.find(item => item.product.toString() === id);
    
            if (cartItem) {
                cartItem.quantity += item.quantity;
                cartItem.amount = cartItem.productPrice * cartItem.quantity;
            } 
            else {
                cart.items.push({
                    product: model,
                    productPrice: model.price,
                    quantity: item.quantity,
                    amount: model.price * item.quantity
                });
            }
    
            cart.totalAmount = cart.items.reduce((acc, item) => acc + item.amount, 0);
            
            await cart.save();
            return cart;
        }
        catch (e) {
            logger.error("Errror: " + e.message)
            throwError("Error adding Item to Cart", 400)
        }
    }
    
    public async removeFromCart(user: any, productId: string) {
        const cart = await this.findOne({ user, active: true});
        if (!cart) throwError("Cart not found", 400)
    
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        cart.totalAmount = cart.items.reduce((acc, item) => acc + item.amount, 0);
    
        await cart.save();
        return cart;
    }
}

export default new CartService();