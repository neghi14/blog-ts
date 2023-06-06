import { readOne, readAll, createOne, updateOne, deleteOne, countAll } from "../../../common/utils/database.utils";
import blogSchema from "../../../common/database/schema/blog.schema";
import { injectable } from "tsyringe";
import CRUD from "../../../common/interface/crud.interface";

@injectable()
export default class BlogRepository implements CRUD {
  async readOne(params: object): Promise<unknown> {
    return await readOne(blogSchema, params);
  }
  async readAll(query: Record<string, any>): Promise<unknown> {
    return await readAll(blogSchema, query);
  }
  async createOne(payload: object): Promise<unknown> {
    return await createOne(blogSchema, payload);
  }
  async updateOne(params: string, payload: object): Promise<unknown> {
    return await updateOne(blogSchema, params, payload);
  }
  async deleteOne(params: string): Promise<unknown> {
    return await deleteOne(blogSchema, params);
  }
  async countAll(): Promise<unknown> {
    return await countAll(blogSchema);
  }
}
