import { Router } from "express";
import { signup, login, getMe } from "../controllers/user";
import passport from "passport";
import { protect } from "../middlewares/isAdmin";
import { googleAuthSuccess } from "../controllers/googleAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthSuccess
);

export default router;
