import { Response } from "express";
import { HTTP } from "../constants/http.constant";
import { ExceptionHandler } from "../handlers/exception.handler";

export default abstract class HttpController extends ExceptionHandler {
  
  /**
   * @param res
   * @param data
   * @param message
   * @param error
   * @param status
   */
  public return = (
    res: Response,
    data: any = {},
    message: any = null,
    error: boolean = false,
    status: number = HTTP.OK
  ): Response => {
    return res.status(status).send({ message, data, error });
  };
  /**
   *
   * @param res
   * @param data
   * @param status
   */
  public returnData = (
    res: Response,
    data: any = {},
    status: number = HTTP.OK
  ): Response => {
    return res.status(status).send({...data, status: true});
  };

  /**
   *
   * @param res
   * @param message
   * @param status
   * @param error
   */
  public returnMessage = (
    res: Response,
    message: string = "",
    status: number = HTTP.OK,
    error: boolean = false
  ): Response => {
    return res.status(status).send({ status: error, message });
  };

  /**
   *
   * @param res
   * @param data
   * @param message
   */
  public returnCreated = (
    res: Response,
    data: any = {},
    message: string = "Created"
  ): Response => {
    return this.return(res, data, message, false, HTTP.CREATED);
  };

  /**
   *
   * @param res
   * @param data
   * @param message
   */
    public returnOk = (
      res: Response,
      data: any = {},
      message: string = "Success"
    ): Response => {
      return this.return(res, data, message, false, HTTP.OK);
    };

  /**
   *
   * @param res
   * @param message
   */
  public returnBadRequest = (
    res: Response,
    message: string = "Bad Request"
  ): Response => {
    res.locals.errorMessage = message;
    return this.returnMessage(res, message, HTTP.BAD_REQUEST, false);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnUnauthorized = (
    res: Response,
    message: string = "Unauthorized"
  ): Response => {
    res.locals.errorMessage = message;
    return this.returnMessage(res, message, HTTP.UNAUTHORIZED, false);
  };

  /**
   *
   * @param res
   * @param message
   */
  public returnNotFound = (
    res: Response,
    message: string = "Not Found"
  ): Response => {
    res.locals.errorMessage = message;
    return this.returnMessage(res, message, HTTP.NOT_FOUND, false);
  };

  /**
   *
   * @param res
   * @param message
   * @param stack
   */
  public returnServerError = (
    res: Response,
    err
  ): Response => {
    let message = err.message ?? 'Internal Server Error';
    return this.returnMessage(res, message, err.code ?? 500, false);
  };

  /**
   *
   * @param res
   * @param error
   */
  public processException = (res: Response, error: any): Response => {
    const { errorData, statusCode } = this.handleErrors(error);
    return this.returnData(res, errorData, statusCode);
  };
}