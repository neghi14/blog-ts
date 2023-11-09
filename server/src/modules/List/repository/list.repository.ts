import { injectable } from "tsyringe";
import CRUD from "../../../common/interface/crud.interface";
import List from "../../../common/database/model/list.model";
import DatabaseQueryHelper from "../../../common/helpers/database.helper";
import listSchema from "../../../common/database/schema/list.schema";

@injectable()
export default class ListRepository implements CRUD {
  constructor(private databaseQuery: DatabaseQueryHelper) {}
  async readOne(params: List): Promise<any> {
    try {
      return await this.databaseQuery.readOne(listSchema, params);
    } catch (error) {
      return error;
    }
  }
  async readAll(query: Record<string, any>): Promise<any> {
    try {
      return await this.databaseQuery.readAll(listSchema, query);
    } catch (error) {
      return error;
    }
  }
  async createOne(payload: List): Promise<any> {
    try {
      return await this.databaseQuery.createOne(listSchema, payload);
    } catch (error) {
      return error;
    }
  }
  async updateOne(params: string, payload: List): Promise<any> {
    try {
      return await this.databaseQuery.updateOne(listSchema, params, payload);
    } catch (error) {
      return error;
    }
  }
  async deleteOne(params: string): Promise<any> {
    try {
      return await this.databaseQuery.deleteOne(listSchema, params);
    } catch (error) {
      return error;
    }
  }
  async countAll(): Promise<any> {
    try {
      return await this.databaseQuery.countAll(listSchema);
    } catch (error) {
      return error;
    }
  }
}
