import express from "express";
import cors from "cors";
import foodRoutes from "./routes/food";
import authRoutes from "./routes/user";
import passport from "passport";
import "./config/passport";
import orderRoutes from "./routes/order";

const app = express();
app.use(cors());

app.use(passport.initialize());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

export default app;
