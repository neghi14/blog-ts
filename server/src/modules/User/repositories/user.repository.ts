import { injectable } from "tsyringe";
import { readOne, readAll, createOne, updateOne, deleteOne, countAll } from "../../../common/utils/database.utils";
import userSchema from "../../../common/database/schema/user.schema";
import CRUD from "../../../common/interface/crud.interface";

@injectable()
export default class UserRepository implements CRUD {
  async readOne(params: object): Promise<unknown> {
    try {
      return await readOne(userSchema, params);
    } catch (error) {
      return error;
    }
  }
  async readAll(query: object): Promise<unknown> {
    try {
      return await readAll(userSchema, query);
    } catch (error) {
      return error;
    }
  }
  async createOne(payload: any): Promise<unknown> {
    try {
      return await createOne(userSchema, payload);
    } catch (error) {
      return error;
    }
  }
  async updateOne(params: string, payload: object): Promise<unknown> {
    try {
      return await updateOne(userSchema, params, payload);
    } catch (error) {
      return error;
    }
  }
  async deleteOne(params: string): Promise<unknown> {
    try {
      return await deleteOne(userSchema, params);
    } catch (error) {
      return error;
    }
  }
  async countAll(): Promise<unknown> {
    try {
      return await countAll(userSchema);
    } catch (error) {
      return error;
    }
  }
}
