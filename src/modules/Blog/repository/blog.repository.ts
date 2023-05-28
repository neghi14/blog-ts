import {
  getSingleData,
  getAllData,
  createData,
  updateData,
  deleteData,
} from "../../../common/utils/database";
import blogSchema from "../../../common/database/schema/blog.schema";
import { Blog } from "../../../common/database/model";
import { injectable } from "tsyringe";

@injectable()
export default class BlogRepository {
  async getAllBlog() {
    return await getAllData(blogSchema);
  }
  async getBlog(data: Blog) {
    return await getSingleData(blogSchema, data._id);
  }
  async addBlog(data: Blog) {
    return await createData(blogSchema, data);
  }
  async editBlog(data: Blog, payload: Blog) {
    return await updateData(blogSchema, data, payload);
  }
  async removeBlog(data: string) {
    return await deleteData(blogSchema, data);
  }
}
