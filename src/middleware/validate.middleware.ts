import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import HttpController from "../common/controllers/http.controller";
import { pick } from "../utils/helpers";

export class ValidateMiddleware extends HttpController {

  public validate = (schema: any): any => (req: Request, res: Response, next: NextFunction): any => {
    
    if(!req.body) {
      return next(this.returnBadRequest(res, "Body is missing from the request"));
    }

    const validSchema = pick(schema, ["params", "query", "body", "headers"]);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } }).validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details): string => details.message).join(", ");
      return next(this.returnBadRequest(res, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };
}

export default new ValidateMiddleware();