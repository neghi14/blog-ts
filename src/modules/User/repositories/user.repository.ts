import { injectable } from "tsyringe";
import { createData, updateData, deleteData, readAllData, readSingleData } from "../../../common/utils/database";
import userSchema from "../../../common/database/schema/user.schema";

@injectable()
export default class UserRepository {
  async readAllUser() {
    return await readAllData(userSchema);
  }
  async readSingleUser(data: Record<string, string | number>) {
    return await readSingleData(userSchema, data);
  }
  async updateUser(data: Record<string, string | number>, payload: Record<string, string | number>) {
    return await updateData(userSchema, data, payload);
  }
  async createUser(data: Record<string, string | number>) {
    return await createData(userSchema, data);
  }
  async deleteUser(data: Record<string, string | number>) {
    return await deleteData(userSchema, data);
  }
}
