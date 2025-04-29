import Joi from "joi";

export class AuthValidator {
  public login: object = {

    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .messages({
          "string.empty": `Email cannot be an empty field`,
          "any.required": `Email is a required field`,
        }),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
          "string.empty": `Password cannot be an empty field`,
          "string.min": `Password should have a minimum length of {#limit}`,
          "string.max": `Password should have a maximum length of {#limit}`,
          "any.required": `Password is a required field`
        })
    })
  };

  public register: object = {
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .messages({
          "string.empty": `Name cannot be an empty field`,
          "any.required": `Name is a required field`
        }),
      email: Joi.string()
        .required()
        .email()
        .messages({
          "string.empty": `Email cannot be an empty field`,
          "any.required": `Email is a required field`,
          "string.email": `You need to enter a valid email`
        }),
      password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .messages({
          "string.empty": `Password cannot be an empty field`,
          "string.min": `Password should have a minimum length of {#limit}`,
          "string.max": `Password should have a maximum length of {#limit}`,
          "any.required": `Password is a required field`
        }),
    })
  };
}

export default new AuthValidator();