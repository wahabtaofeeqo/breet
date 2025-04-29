import {prop, Ref} from '@typegoose/typegoose';
import BaseModel from "../../common/models/base.model";
import User from "../user/user.model";
import Product from '../product/product.model';

class CartItem {
  @prop({ required: true, ref: () => Product })
  public product!: Ref<Product>;

  @prop({ required: true, min: 0 })
  public productPrice!: number;

  @prop({ required: true, min: 1, default: 1 })
  public quantity!: number;

  @prop({ required: true, min: 0 })
  public amount!: number;
}

export default class CartSchema extends BaseModel {
  @prop({ required: true, ref: () => User, unique: false })
  public user!: Ref<User>;

  @prop({ type: () => [CartItem], default: [] })
  public items!: CartItem[];

  @prop({ required: true, min: 0, default: 0 })
  public totalAmount!: number;

  @prop({ required: true, default: false })
  public active!: boolean;
}