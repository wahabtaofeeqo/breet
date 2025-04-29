import { Request, Response } from "express";
import HttpController from "./http.controller";
import { CrudService } from "../services/crud.service";


export default abstract class CrudController extends HttpController {

  abstract service: CrudService;

  /**
   * get method
   *
   * @param req
   * @param res
   */
  public get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req.params.id;
      const data = await this.service.get(id);
      if (!data)
        this.returnBadRequest(
          res,
          `ID for ${this.service.modelName} is invalid!`
        );
      return this.returnData(res, {
        message: `${this.service.modelName} fetched successfully!`,
        data

      });
    } catch (err) {
      return this.processException(res, err);
    }
  };

  /**
   * list all method
   *
   * @param req
   * @param res
   */
  public index = async (req: Request, res: Response) => {
    try {
      const options = await this.buildOptions(req.query);
      const data = await this.service.all(options);
      this.returnData(res, {
          message: `${this.service.modelName} fetched successfully!`,
          data
        },
      );
    } catch (err) {
      this.processException(res, err);
    }
  };

  /**
   *
   * @param query
   */
  public buildOptions = async (query: any): Promise<{}> => {
    return {
      page: (query && query.page) || 1,
      hide: (query && query.hide) || '',
      limit: (query && parseInt(query.limit, 10)) || 10,
      sort: (query && query.sort) || '-createdAt',
      sortBy: (query && query.sortBy) || '-createdAt',
    };
  };
}