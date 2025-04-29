import Joi from "joi";
import { validateObjectId } from "../../utils/helpers";

export class OrderValidator {
    
  public createOrder: object = {
    body: Joi.object().keys({
      address: Joi.string()
        .required()
        .messages({
          "string.empty": `Address cannot be an empty field`,
          "any.required": `Address is a required field`
        }),
      cart: Joi.string()
        .custom(validateObjectId)
        .required()
        .messages({
          "string.empty": `Cart Id cannot be an empty field`,
          "any.required": `Cart Id is a required field`
        }),
    })
  };

  public getOrderById: object = {
    params: Joi.object().keys({
      id: Joi.string()
        .exist()
        .custom(validateObjectId)
    })
  };
}

export default new OrderValidator();