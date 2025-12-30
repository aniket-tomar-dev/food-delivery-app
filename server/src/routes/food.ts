import { Router } from "express";
import { getFoods } from "../controllers/food";

const router = Router();

router.get("/", getFoods);

export default router;
