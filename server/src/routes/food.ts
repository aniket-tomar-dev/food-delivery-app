import { Router } from "express";
import { getFoods } from "../controllers/food";
// import { auth } from "../middlewares/auth";
// import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/", getFoods);

// router.post("/", auth, isAdmin, addFood);
// router.put("/:id", auth, isAdmin, updateFood);
// router.delete("/:id", auth, isAdmin, deleteFood);

export default router;
