import { Router } from "express";
import User from "../models/user";
import { protect } from "../middlewares/isAdmin";
import { adminOnly } from "../middlewares/adminOnly";
import { getAdminStats } from "../controllers/adminController";

const router = Router();

router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res.json(users);
});

router.put("/users/:id/block", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isAdmin) {
    return res.status(400).json({
      message: "Admin user cannot be blocked",
    });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    user,
  });
});

router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isAdmin) {
    return res.status(400).json({
      message: "Admin user cannot be deleted",
    });
  }

  await user.deleteOne();

  res.json({ message: "User deleted successfully" });
});
router.get("/stats", protect, adminOnly, getAdminStats);

export default router;
