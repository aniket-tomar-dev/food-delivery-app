import express from "express";
import Order from "../models/order";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/create", auth, async (req, res) => {
  console.log("ORDER USER:", (req as any).user);

  const { items, address, totalAmount } = req.body;

  const order = await Order.create({
    user: (req as any).user?._id,
    items,
    address,
    totalAmount,
    paymentMethod: "COD",
  });

  res.status(201).json(order);
});

export default router;
