import { readSingleData, readAllData, createData, updateData, deleteData } from "../../../common/utils/database.utils";
import blogSchema from "../../../common/database/schema/blog.schema";
import { injectable } from "tsyringe";

@injectable()
export default class BlogRepository {
  async readSingleBlog(data: Record<string, string | number>) {
    return await readSingleData(blogSchema, data);
  }
  async readAllBlog(options?: Record<string, string | number>) {
    return await readAllData(blogSchema, options);
  }
  async createBlog(data: Record<string, string | number>) {
    return await createData(blogSchema, data);
  }
  async updateBlog(data: Record<string, string | number>, payload: Record<string, string | number>) {
    return await updateData(blogSchema, data, payload);
  }
  async deleteBlog(data: Record<string, string | number>) {
    return await deleteData(blogSchema, data);
  }
}
