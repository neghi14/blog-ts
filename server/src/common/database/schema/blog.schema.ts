/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Schema, model } from "mongoose";
import { Blog } from "../model";

const BlogSchema: Schema = new Schema<Blog>(
  {
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
    slug: {
      type: String,
      required: true,
      unique: true,
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

BlogSchema.virtual("comment", {
  ref: "Comments",
  foreignField: "article",
  localField: "_id",
});

BlogSchema.virtual("like", {
  ref: "Likes",
  foreignField: "liked_post",
  localField: "_id",
});
BlogSchema.virtual("saved", {
  ref: "Listings",
  foreignField: "article",
  localField: "_id",
});

BlogSchema.pre(/^find/, async function (next) {
  this.select("-__v");
  //@ts-ignore
  this.populate({
    path: "author",
    select: "-__v -password",
  });
  //@ts-ignore
  this.populate({
    path: "comment",
    select: "-__v",
  });
  //@ts-ignore
  this.populate({
    path: "like",
    select: "-__v",
  });

  //@ts-ignore
  this.populate({
    path: "saved",
    select: "-__v",
  });
  next();
});

export default model<Blog>("Blogs", BlogSchema);
