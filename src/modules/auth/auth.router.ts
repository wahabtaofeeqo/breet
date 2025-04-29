import { Router } from "express";
import validateMiddleware from "../../middleware/validate.middleware";
import authValidator from "./auth.validator";
import authController from "./auth.controller";

const { validate } = validateMiddleware;

export class AuthRouter {
  public router: Router = Router();

  public constructor() {
    this.init();
  }

  public init(): void {
    this.router.post("/login",
        validate(authValidator.login),
        authController.login
    );

    this.router.post("/register", 
        validate(authValidator.register),
        authController.register
    );
  }
}

export default new AuthRouter().router;