import {modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true, getters: true, transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      virtuals: true, getters: true, transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
    timestamps: true,
  },
})

export default class BaseModel {
  public id?: string
  public _id?: string
}