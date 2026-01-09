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
    status: "Pending",
    estimatedDeliveryTime: "30 mins",
  });

  res.status(201).json(order);
  setTimeout(async () => {
    await Order.findByIdAndUpdate(order._id, {
      status: "Confirmed",
      estimatedDeliveryTime: "25 mins",
    });
  }, 5000);

  setTimeout(async () => {
    await Order.findByIdAndUpdate(order._id, {
      status: "Out for Delivery",
      estimatedDeliveryTime: "15 mins",
      rider: {
        name: "Rahul Sharma",
        phone: "98XXXXXX12",
      },
    });
  }, 10000);

  setTimeout(async () => {
    await Order.findByIdAndUpdate(order._id, {
      status: "Delivered",
      estimatedDeliveryTime: "Delivered",
    });
  }, 15000);
});

router.get("/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

router.patch("/:id/status", auth, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;

  if (status === "Out for Delivery") {
    order.estimatedDeliveryTime = "15 mins";
    order.rider = {
      name: "Rahul Sharma",
      phone: "8890523533",
    };
  }

  if (status === "Delivered") {
    order.estimatedDeliveryTime = "Delivered";
  }

  await order.save();
  res.json(order);
});

export default router;
