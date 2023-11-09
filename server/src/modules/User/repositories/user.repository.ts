import { injectable } from "tsyringe";
import DatabaseQueryHelper from "../../../common/helpers/database.helper";
import userSchema from "../../../common/database/schema/user.schema";
import CRUD from "../../../common/interface/crud.interface";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class UserRepository implements CRUD {
  constructor(private query: DatabaseQueryHelper) {}
  async readOne(params: object): Promise<unknown> {
    try {
      return await this.query.readOne(userSchema, params);
    } catch (error) {
      return error;
    }
  }
  async readAll(query: object): Promise<unknown> {
    try {
      return await this.query.readAll(userSchema, query);
    } catch (error) {
      return error;
    }
  }
  async createOne(payload: object): Promise<unknown> {
    try {
      return await this.query.createOne(userSchema, payload);
    } catch (error: any) {
      throw new ErrorUtility(error.message, 400);
    }
  }
  async updateOne(params: string, payload: object): Promise<unknown> {
    try {
      return await this.query.updateOne(userSchema, params, payload);
    } catch (error) {
      return error;
    }
  }
  async deleteOne(params: string): Promise<unknown> {
    try {
      return await this.query.deleteOne(userSchema, params);
    } catch (error) {
      return error;
    }
  }
  async countAll(): Promise<unknown> {
    try {
      return await this.query.countAll(userSchema);
    } catch (error) {
      return error;
    }
  }
}
