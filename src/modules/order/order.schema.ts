import { prop, Ref } from '@typegoose/typegoose';
import BaseModel from "../../common/models/base.model";
import User from "../user/user.model";
import Cart from '../cart/cart.model';

export enum OrderStatus {
    INITIATED = 'INITIATED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REJECTED = 'REJECTED'
  }
  
  export enum OrderPaymentStatus {
    NOT_PAID = 'NOT_PAID',
    FAILED = 'FAILED',
    PAID = 'PAID',
  }

export default class OrderSchema extends BaseModel {

  @prop({ required: false, ref: 'User' })
  public user?: Ref<User>;

  @prop({ required: true, ref: 'Cart' })
  public cart!: Ref<Cart>;

  @prop({ required: false, minlength: 3 })
  public address?: string;

  @prop({ required: true, enum: OrderStatus, default: OrderStatus.INITIATED })
  public status!: OrderStatus;

  @prop({ required: true, enum: OrderPaymentStatus, default: OrderPaymentStatus.NOT_PAID })
  public paymentStatus!: OrderPaymentStatus;

  @prop({ required: false, min: 1 })
  public totalAmount!: number;
}