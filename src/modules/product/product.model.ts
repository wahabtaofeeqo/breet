import {getModelForClass } from '@typegoose/typegoose';
import ProductSchema from './product.schema';

export default class Product extends ProductSchema {}
export const ProductModel = getModelForClass(Product);