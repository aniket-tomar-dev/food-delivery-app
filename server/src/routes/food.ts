import { Router } from "express";
import { getFoods, addFood, updateFood, deleteFood } from "../controllers/food";
import { protect } from "../middlewares/protect";
import { adminOnly } from "../middlewares/adminOnly";

const router = Router();

// 🔓 PUBLIC (Users)
router.get("/", getFoods);

// 🔐 ADMIN (CRUD)
router.post("/", protect, adminOnly, addFood);
router.put("/:id", protect, adminOnly, updateFood);
router.delete("/:id", protect, adminOnly, deleteFood);

export default router;
