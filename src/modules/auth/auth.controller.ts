import { Request, Response } from "express";
import { compare } from "bcryptjs";
import HttpController from "../../common/controllers/http.controller";
import userService from "../user/user.service";
import tokenService from "../../common/services/token.service";
import { throwError } from "../../utils/helpers";

export class AuthController extends HttpController {
    
    private userService = userService;
    private tokenService = tokenService;

    /**
     * 
     * @param req 
     * @param res 
     */
    public login = async (req: Request, res: Response) => {
        let messageError = "User credentials is incorrect!";
        try {
            const { email, password } = req.body;

            let user = await this.userService.findUserByEmail(email);

            if (!user) this.returnUnauthorized(res, messageError);

            const match = await compare(password.toString(), user.password);
            if (!match) this.returnUnauthorized(res, messageError);

            const tokens = this.tokenService.generateAuthTokens(email);

            this.returnData(res, {
                message: "Logged in successfully",
                user,
                tokens
            });
        }
        catch (err) {
            this.returnServerError(res, err);
        }
    };

    /**
     * 
     * @param req 
     * @param res 
     */
    public register = async (req: Request, res: Response) => {
        try {
    
            let user = await this.userService.findOne({
                email: req.body.email
            });
    
            if(user) {
                throwError('Email has already been taken', 422);
            }
            else {
                const body = req.body;
                user = await this.userService.create({
                    ...body,
                });

                /**
                 * Further proccessing like verification could be done
                 * 
                 */
        
                this.returnData(res, {
                    message: "User Registered successfully", user,
                });
            }
        }
        catch (err) {
            this.returnServerError(res, err);
        }
      };    
}

export default new AuthController();