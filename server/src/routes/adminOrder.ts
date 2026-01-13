import { Router } from "express";
import Order from "../models/order";
import { protect } from "../middlewares/protect";
import { adminOnly } from "../middlewares/adminOnly";

const router = Router();

// GET ALL ORDERS (ADMIN)
router.get("/orders", protect, adminOnly, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// UPDATE ORDER STATUS (ADMIN)
router.put("/orders/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({ message: "Order updated", order });
});

export default router;
