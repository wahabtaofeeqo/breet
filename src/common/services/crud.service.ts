import {Ref} from "@typegoose/typegoose";
import { cleanObject, throwError } from "../../utils/helpers";

export abstract class CrudService {
  abstract model : any;
  abstract modelName: string;

  /**
   * Get method
   *
   * @param id
   * @param associations
   */
  public get = async (id: string | Ref<any>, associations: any[] = []): Promise<any> => {
    return this.model.findById(id).populate(associations);
  };

  /**
   * Get method
   *
   * @param criteria
   * @param associations
   */
  public findOne = async (criteria: object, associations: string[] = []): Promise<any> => {
    return await this.model.findOne(criteria).populate(associations);
  };


  /**
   * Get all method
   *
   * @param options
   * @param filter
   * @param associations
   * @param scope
   */
  public all = async (options: any,  filter: any = {}, associations: any[] = []): Promise<any> => {
    // const where = await this.processFilters(options);
    // const findOptions = await this.buildFindOptions(options);
    const { sort, limit, page } = options;
    let data = await this.model.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(limit * (page - 1))
      .populate(associations);
    data.count = await this.count(filter);

    return await this.buildPaginationMetadata(data, options);
  };

  /**
   * List all method
   */
  public count = async (filter): Promise<any> => {
    return await this.model.countDocuments(filter);
  };

  /**
   * List all method
   */
  public find = async (filter, fields : string[] = []): Promise<any> => {
    return await this.model.find(filter).select(fields);
  };

  /**
   * Create method
   *
   * @param object
   */
  public create = async (object: any): Promise<any> => {
    try {
      return await this.model.create(object);
    }
    catch (e){
      throwError(e.message)
    }
  };

  /**
   * Update method
   *
   * @param data
   * @param _id
   * @param options
   */
  public update = async (_id: string, data: any, options: object = {new: true}): Promise<any> => {
    data = cleanObject(data)
    return await this.model.findByIdAndUpdate(_id, data, options);
  };

  /**
   * Update method
   *
   * @param filter
   * @param data
   * @param options
   */
  public updateWhere = async (filter: any, data: any, options: object = {new: true}): Promise<any> => {
    return await this.model.findOneAndUpdate(filter, data, options);
  };

  /**
   * Building pagination metadata
   *
   * @param data
   * @param options
   */
  public buildPaginationMetadata = async (
    data: any,
    options: any
  ): Promise<{}> => {
    const total = data.count;
    const limit = parseInt(options.limit, 10);
    const pages = total / limit;
    const from = Number(options.page) === 1 ? 1 : (options.page - 1) * limit + 1;
    const to = from + data.length - 1;
    const totalPages = pages > Math.floor(pages) ? Math.floor(pages + 1) : pages;
    return {
      rows: data,
      current_page: Number(options.page),
      per_page: limit,
      total_pages: totalPages,
      total,
      from,
      to,
    };
  }
}