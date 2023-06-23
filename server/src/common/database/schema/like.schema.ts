import { Schema, model } from "mongoose";
import { Like } from "../model";

const LikeSchema: Schema = new Schema<Like>({
  liked_by: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  liked_post: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
  liked_comment: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model<Like>("Likes", LikeSchema);
