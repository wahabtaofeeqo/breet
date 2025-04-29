
import { ErrorHandler } from "./error.handler";

export abstract class ExceptionHandler extends ErrorHandler {
    
  /**
   * @param error
   */
  public getParseFunction = (error: Error): Function => {
    return this.handleUnknownError;
  };

  /**
   * @param error
   */
  public handleErrors = (error: Error): any => {
    const handleFunction = this.getParseFunction(error);
    return handleFunction(error);
  };
}