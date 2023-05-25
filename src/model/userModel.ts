import mongoose from "mongoose";

interface User {
  username: string;
  password: string;
  email: string;
  name: string;
  phone?: string;
}

const UserSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 14,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.model<User>("Users", UserSchema);
