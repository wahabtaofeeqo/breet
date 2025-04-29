import Joi from "joi";
import { validateObjectId } from "../../utils/helpers";

export class CartValidator {

  public addItemToCart: object = {
    body: Joi.object().keys({
      product: Joi.string()
        .custom(validateObjectId)
        .required()
        .messages({
          "string.empty": `Product ID cannot be an empty field`,
          "any.required": `Product ID is a required field`
        }),
      quantity: Joi.number()
        .positive()
        .required()
        .messages({
          "number.empty": `Quantity cannot be an empty field`,
          "number.positive": `Quantity must be a positive number`,
          "any.required": `Quantity is a required field`
        }),
    })
  };

  public addItemsToCart: object = {
    body: Joi.object().keys({
      items: Joi.array()
      .items({
        product: Joi.string()
        .custom(validateObjectId)
        .required()
        .messages({
          "string.empty": `Product ID cannot be an empty field`,
          "any.required": `Product ID is a required field`
        }),
      quantity: Joi.number()
        .positive()
        .required()
        .messages({
          "number.empty": `Quantity cannot be an empty field`,
          "number.positive": `Quantity must be a positive number`,
          "any.required": `Quantity is a required field`
        }),
      })
    })
  };
}

export default new CartValidator();