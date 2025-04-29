import {getModelForClass } from '@typegoose/typegoose';
import UserSchema from './user.schema';

export default class User extends UserSchema {}
export const UserModel = getModelForClass(User);