import { Request, Response } from "express";
import CartItem from "../models/cartItem";

export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const cart = await CartItem.find({ userId }).populate("foodItemId");
  res.json(cart);
};

export const updateAndAddCart = async (req: Request, res: Response) => {
  const { userId, foodItemId, quantity } = req.body;

  if (!foodItemId) {
    return res.status(400).json({ message: "foodItemId is required" });
  }

  const existing = await CartItem.findOne({ userId, foodItemId });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.json(existing);
  }

  const newItem = await CartItem.create({ userId, foodItemId, quantity });
  res.json(newItem);
};

export const updateQuantity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type } = req.body;

  const item = await CartItem.findById(id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  if (type === "inc") item.quantity += 1;
  if (type === "dec") item.quantity -= 1;

  if (item.quantity <= 0) {
    await item.deleteOne();
    return res.json({ removed: true });
  }

  await item.save();
  res.json(item);
};

export const removeCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  await CartItem.findByIdAndDelete(id);
  res.json({ success: true });
};
