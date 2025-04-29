import { prop } from '@typegoose/typegoose';
import BaseModel from '../../common/models/base.model';

export default class ProductSchema extends BaseModel {

    @prop({ required: true, unique: true, trim: true })
    public name!: string;

    @prop({ required: true, min: 0 })
    public price!: number;

    @prop({ required: true, min: 0 })
    public stockQuantity!: number;

    @prop({ required: false })
    public description?: string;

    @prop({ required: false })
    public category?: string;

    @prop({ required: true, default: true })
    public active!: boolean;
}