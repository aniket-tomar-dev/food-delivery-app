import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  dob: Date;
  googleId?: string;
  avatar?: string;
  isAdmin: boolean;
  isBlocked: boolean;
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

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
