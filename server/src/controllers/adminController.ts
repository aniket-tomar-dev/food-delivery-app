import { Request, Response } from "express";
import Food from "../models/food";
import Order from "../models/order";
import User from "../models/user";

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalFoods = await Food.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ isAdmin: false });

    res.json({
      totalFoods,
      totalOrders,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
