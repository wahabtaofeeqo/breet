import CrudController from "../../common/controllers/crud.controller";
import productService from "./product.service";

export class ProductController extends CrudController {
    service = productService
}

export default new ProductController();