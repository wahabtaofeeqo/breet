import {getModelForClass } from '@typegoose/typegoose';
import CartSchema from "./cart.schema";

export default class Cart extends CartSchema {}
export const CartModel = getModelForClass(Cart);
