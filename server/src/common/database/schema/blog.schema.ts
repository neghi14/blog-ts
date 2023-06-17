import { Schema, model } from "mongoose";
import { Blog } from "../model";

const BlogSchema: Schema = new Schema<Blog>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    requierd: true,
  },
  sub_title: String,
  view_count: {
    type: Number,
    default: 0,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

BlogSchema.pre(/^find/, async function (next) {
  this.select("-__v");
  //@ts-ignore
  this.populate({
    path: "author",
    select:"-__v -password"
  })

  next();
});

export default model<Blog>("Blogs", BlogSchema);
