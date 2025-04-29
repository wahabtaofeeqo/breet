import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import HttpController from "../common/controllers/http.controller";
import { envs } from "../../config/env";
import userService from "../modules/user/user.service";

export class AuthMiddleware extends HttpController {

    private userService = userService;
    public secretKey: string = envs.jwt.secret || "";

    /**
     *
     * @param req
     */
    public getTokenFromRequest(req: Request): string | null {
        let authorization = req.header("authorization");
        let token = authorization ? authorization.split(" ") : [];
        return token.length ? token[1] : null;
    }

    /**
     *
     * @param req
     * @param userType
     */
    public getAuthUser = async (req: Request): Promise<object | null> => {
        const token = this.getToken(req);
        return await this.getAuthUserByToken(token);
    };

  /**
   *
   * @param token
   * @param userType
   */
  public getAuthUserByToken = async (token: string): Promise<object | null > => {
    const decoded: any = verify(token, this.secretKey);
    const user =  await this.userService.findUserByEmail(decoded.email);
    if (!user) return null
    return user
  };

  /**
   *
   * @param req
   */
  public getToken = (req: Request): string => {
    const token = this.getTokenFromRequest(req);
    if (!token) throw new Error("Token is required");

    return token;
  };

  public verifyAuth = (): any => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        let authUser = null;
        authUser = await this.getAuthUser(req);

        if (authUser) {
          res.locals = { authUser };
          return next();
        } 
        else {
          return this.returnUnauthorized(res);
        }
      } 
      catch (err) {
        return this.returnUnauthorized(res, err.message);
      }
  }

}

export default new AuthMiddleware();