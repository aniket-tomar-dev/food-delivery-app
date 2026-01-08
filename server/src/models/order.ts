import mongoose, { Schema, Document } from "mongoose";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: OrderItem[];
  address: string;
  totalAmount: number;
  paymentMethod: string;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    weight: { type: String },
    image: { type: String },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ THIS IS THE FIX
    items: {
      type: [orderItemSchema],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
