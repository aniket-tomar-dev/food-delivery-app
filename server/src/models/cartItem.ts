import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    foodItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CartItem", CartItemSchema);
