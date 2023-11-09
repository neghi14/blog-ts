import { injectable } from "tsyringe";
import commentSchema from "../../../common/database/schema/comment.schema";
import CRUD from "../../../common/interface/crud.interface";
import DatabaseQueryHelper from "../../../common/helpers/database.helper";
import { Comment } from "../../../common/database/model";

@injectable()
export default class CommentRepository implements CRUD {
  constructor(private databaseQueryHelper: DatabaseQueryHelper) {}
  async readOne(params: object): Promise<unknown> {
    return await this.databaseQueryHelper.readOne(commentSchema, params);
  }
  async readAll(query: Record<string, any>): Promise<any> {
    return await this.databaseQueryHelper.readAll(commentSchema, query);
  }
  async createOne(payload: object): Promise<any> {
    return this.databaseQueryHelper.createOne(commentSchema, payload);
  }
  async updateOne(params: string, payload: object): Promise<any> {
    return await this.databaseQueryHelper.updateOne(commentSchema, params, payload);
  }
  async deleteOne(params: string): Promise<any> {
    return await this.databaseQueryHelper.deleteOne(commentSchema, params);
  }
  async countAll(): Promise<any> {
    return await this.databaseQueryHelper.countAll(commentSchema);
  }
  async deleteAll(query: Comment): Promise<any> {
    return await this.databaseQueryHelper.deleteAll(commentSchema, query);
  }
}
