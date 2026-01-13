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
  status: "Pending" | "Confirmed" | "Out for Delivery" | "Delivered";
  estimatedDeliveryTime: string;
  rider?: {
    name: string;
    phone: string;
  };
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
      // required: true,
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
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    estimatedDeliveryTime: {
      type: String,
      default: "30 mins",
    },

    rider: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
