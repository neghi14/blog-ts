import { Schema, model } from "mongoose";
import Listing from "../model/listing.model";

const listingSchema: Schema = new Schema<Listing>({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: "Lists",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

export default model<Listing>("Listings", listingSchema);
