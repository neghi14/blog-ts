import {
  readData,
  createData,
  updateData,
  deleteData,
} from "../../../common/utils/database";
import { Comment } from "../../../common/database/model";
import { injectable } from "tsyringe";
import commentSchema from "../../../common/database/schema/comment.schema";

@injectable()
export default class CommentRepository {
  async getSingleComment(data: any) {
    return await readData(commentSchema, data);
  }
  async getAllComment() {
    return await readData(commentSchema);
  }
  async addComment(data: Comment) {
    return await createData(commentSchema, data);
  }
  async editComment(data: any, payload: Comment) {
    return await updateData(commentSchema, data, payload);
  }
  async removeComment(data: any) {
    return await deleteData(commentSchema, data);
  }
}
