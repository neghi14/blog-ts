import { readAll, readOne, createOne, updateOne, deleteOne, countAll } from "../../../common/utils/database.utils";
import { injectable } from "tsyringe";
import commentSchema from "../../../common/database/schema/comment.schema";
import CRUD from "../../../common/interface/crud.interface";
import DatabaseQueryHelper from "../../../common/helpers/database.helper";

@injectable()
export default class CommentRepository implements CRUD {
  constructor(private databaseQueryHelper: DatabaseQueryHelper) {}
  async readOne(params: object): Promise<unknown> {
    return await this.databaseQueryHelper.readOne(commentSchema, params);
  }
  async readAll(query: Record<string, any>): Promise<unknown> {
    return await this.databaseQueryHelper.readAll(commentSchema, query);
  }
  async createOne(payload: object): Promise<unknown> {
    return this.databaseQueryHelper.createOne(commentSchema, payload);
  }
  async updateOne(params: string, payload: object): Promise<unknown> {
    return await this.databaseQueryHelper.updateOne(commentSchema, params, payload);
  }
  async deleteOne(params: string): Promise<unknown> {
    return await this.databaseQueryHelper.deleteOne(commentSchema, params);
  }
  async countAll(): Promise<unknown> {
    return await this.databaseQueryHelper.countAll(commentSchema);
  }
}
