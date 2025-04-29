import { HTTP } from "../constants/http.constant";

export abstract class ErrorHandler {
  /**
   * @param error
   *
   */
  public handleUnknownError(error: Error): { errorData: any; statusCode: number } {
    return {
      errorData: {
        code: HTTP.INTERNAL_SERVER_ERROR,
        message: error.message
      },
      statusCode: HTTP.INTERNAL_SERVER_ERROR
    };
  }
}