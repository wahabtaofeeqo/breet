import { CrudService } from "../../common/services/crud.service";
import User, { UserModel } from "./user.model";

class UserService extends CrudService {

  public model = UserModel;
  public modelName = 'User';

  /**
   *
   * @param email
   */
  public async findUserByEmail(
    email: string,
  ): Promise<User | null> {

    return await this.findOne({
      email
    }, [])
  }

  /**
   *
   * @param type
   * @param userId
   */
}

export default new UserService();