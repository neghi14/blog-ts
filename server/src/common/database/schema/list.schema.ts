import { Schema, model } from "mongoose";
import List from "../model/list.model";

const ListSchema: Schema = new Schema<List>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    default: 0,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

export default model<List>("Lists", ListSchema);
