import { Schema, model } from "mongoose";
import { Comment } from "../model";

const CommentSchema: Schema = new Schema<Comment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
  replied_to: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  restricted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

export default model<Comment>("Comments", CommentSchema);
