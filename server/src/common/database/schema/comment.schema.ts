import { Schema, model } from "mongoose";
import { Comment } from "../model";

const CommentSchema: Schema = new Schema<Comment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    // required: true,
  },
  body: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
    // required: true,
  },
  restricted: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  }
});

export default model<Comment>("Comments", CommentSchema);
