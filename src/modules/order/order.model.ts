import {getModelForClass } from '@typegoose/typegoose';
import OrderSchema from './order.schema';

export default class Order extends OrderSchema {}
export const OrderModel = getModelForClass(Order);
