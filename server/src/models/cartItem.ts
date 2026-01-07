// models/CartItem.ts
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("CartItem", CartItemSchema);
