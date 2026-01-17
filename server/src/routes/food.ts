import { Router } from "express";
import { getFoods, addFood, updateFood, deleteFood } from "../controllers/food";
import { protect } from "../middlewares/protect";
import { adminOnly } from "../middlewares/adminOnly";
import { uploadFoodImage } from "../middlewares/upload";

const router = Router();

router.get("/", getFoods);

router.post("/", protect, adminOnly, uploadFoodImage.single("image"), addFood);
router.put("/:id", protect, adminOnly, updateFood);
router.delete("/:id", protect, adminOnly, deleteFood);

export default router;
