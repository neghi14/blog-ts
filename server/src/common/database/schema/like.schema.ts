import { Schema, model } from "mongoose";
import { Like } from "../model";

const LikeSchema: Schema = new Schema<Like>({
  name: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default model<Like>("Likes", LikeSchema);
