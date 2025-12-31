import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dob: Date;
  googleId?: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    dob: {
      type: Date,
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
