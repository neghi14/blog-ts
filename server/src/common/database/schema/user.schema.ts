import { Schema, model } from "mongoose";
import { User } from "../model";

const UserSchema: Schema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  verify_token: {
    type: String,
  },
  verify_token_active: Date,
  reset_token: String,
  reset_token_active: Date,
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

export default model<User>("Users", UserSchema);
