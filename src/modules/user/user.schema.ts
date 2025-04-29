import { pre, prop } from '@typegoose/typegoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import BaseModel from '../../common/models/base.model';

@pre<UserSchema>('save', function () {
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password =  bcrypt.hashSync(this.password, salt);
  }
})
export default class UserSchema extends BaseModel {
  @prop({
    required: true, lowercase: true, unique: true,
    validate: {
      validator: (v):boolean => {
        return validator.isEmail(v);
      },
      message: '{VALUE} is not a valid email',
    },
  })
  public email!: string;

  @prop({minlength: 2, required: true})
  public name!: string;

  @prop({ minlength: 6, hide: true, hideJSON: true })
  public password!: string;

  @prop({required: false})
  public phone?: string;

  @prop({required: true, default: true})
  public active!: boolean;
}