import mongoose, { Schema, Types } from "mongoose";

interface Blog {
  title: string;
  body: string;
  author: Types.ObjectId;
  comments?: string;
}

const BlogSchema = new mongoose.Schema<Blog>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    min: 250,
    max: 3000,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export default mongoose.model<Blog>("Blog", BlogSchema);
