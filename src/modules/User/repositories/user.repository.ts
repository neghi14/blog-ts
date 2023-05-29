import { injectable } from "tsyringe";
import {
  createData,
  readData,
  updateData,
  deleteData,
} from "../../../common/utils/database";
import userSchema from "../../../common/database/schema/user.schema";
import { User } from "../../../common/database/model";

@injectable()
export default class UserRepository {
  async getAllUser() {
    return await readData(userSchema);
  }
  async getSingleUser(data: any) {
    return await readData(userSchema, data);
  }
  async editUser(data: User, payload: User) {
    return await updateData(userSchema, data, payload);
  }
  async createUser(data: User) {
    return await createData(userSchema, data);
  }
  async deleteUser(data: User) {
    return await deleteData(userSchema, data);
  }
}
