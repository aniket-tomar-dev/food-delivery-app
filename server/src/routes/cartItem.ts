import express from "express";
import cartItem from "../models/cartItem";
import {
  getCart,
  removeCart,
  updateAndAddCart,
  updateQuantity,
} from "../controllers/cartItem";
const router = express.Router();

router.get("/:userId", getCart);

router.post("/", updateAndAddCart);

router.patch("/:id", updateQuantity);

router.delete("/:id", removeCart);

export default router;
