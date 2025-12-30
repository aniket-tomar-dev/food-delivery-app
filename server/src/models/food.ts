import mongoose, { Document, Schema } from "mongoose";

export interface IFood extends Document {
  name: string;
  price: number;
  weight: string;
  description: string;
  image: string;
  rating: number;
  isAvailable: boolean;
  type: "veg" | "non-veg";
}

const foodSchema = new Schema<IFood>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: String },
    description: { type: String },
    image: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    isAvailable: { type: Boolean, default: true },
    type: { type: String, enum: ["veg", "non-veg"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFood>("Food", foodSchema);
