import { model, Schema } from "mongoose";
import Session from "../model/session.model";

const SessionSchema: Schema = new Schema<Session>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  refresh_token: String,
  session_token: String,
  userAgent: String,
  user_ip: String,
  is_valid: Boolean,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

export default model<Session>("Sessions", SessionSchema);
