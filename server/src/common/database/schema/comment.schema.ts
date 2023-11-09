/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Schema, model } from "mongoose";
import { Comment } from "../model";

const CommentSchema: Schema = new Schema<Comment>(
  {
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
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CommentSchema.virtual("replies", {
  ref: "Comments",
  foreignField: "replied_to",
  localField: "_id",
});
CommentSchema.virtual("like", {
  ref: "Likes",
  foreignField: "liked_comment",
  localField: "_id",
});

CommentSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate("author");
  //@ts-ignore
  this.populate("replies");
  //@ts-ignore
  this.populate("like");
  next();
});

export default model<Comment>("Comments", CommentSchema);
