import { readAllData, readSingleData, createData, updateData, deleteData } from "../../../common/utils/database.utils";
import { injectable } from "tsyringe";
import commentSchema from "../../../common/database/schema/comment.schema";

@injectable()
export default class CommentRepository {
  async readSingleComment(data: Record<string, string | number>) {
    return await readSingleData(commentSchema, data);
  }
  async readAllComment(options?: Record<string, string | number>) {
    return await readAllData(commentSchema, options);
  }
  async createComment(data: Record<string, string | number>) {
    return await createData(commentSchema, data);
  }
  async updateComment(data: Record<string, string | number>, payload: Record<string, string | number>) {
    return await updateData(commentSchema, data, payload);
  }
  async deleteComment(data: Record<string, string | number>) {
    return await deleteData(commentSchema, data);
  }
}
