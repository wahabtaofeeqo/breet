import { CrudService } from "../../common/services/crud.service";
import { ProductModel } from "./product.model";

class ProductService extends CrudService {
  public model = ProductModel;
  public modelName = 'Product';
}

export default new ProductService();