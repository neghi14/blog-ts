import { injectable } from "tsyringe";
import CRUD from "../../../common/interface/crud.interface";
import DatabaseQueryHelper from "../../../common/helpers/database.helper";
import likeSchema from "../../../common/database/schema/like.schema";

@injectable()
export default class LikesRepository implements CRUD {
  constructor(private databaseQueryHelper: DatabaseQueryHelper) {}
  async readOne(params: object): Promise<unknown> {
    try {
      return await this.databaseQueryHelper.readOne(likeSchema, params);
    } catch (error) {
      return error;
    }
  }
  async readAll(query: Record<string, any>): Promise<unknown> {
    try {
      return await this.databaseQueryHelper.readAll(likeSchema, query);
    } catch (error) {
      return error;
    }
  }
  async createOne(payload: object): Promise<unknown> {
    try {
      return await this.databaseQueryHelper.createOne(likeSchema, payload);
    } catch (error) {
      return error;
    }
  }
  async updateOne(params: string, payload: object): Promise<unknown> {
    try {
      return await this.databaseQueryHelper.updateOne(likeSchema, params, payload);
    } catch (error) {
      return error;
    }
  }
  async deleteOne(params: string): Promise<unknown> {
    try {
      return await this.databaseQueryHelper.deleteOne(likeSchema, params);
    } catch (error) {
      return error;
    }
  }
  async countAll(): Promise<unknown> {
    try {
      return await this.databaseQueryHelper.countAll(likeSchema);
    } catch (error) {
      return error;
    }
  }
}
