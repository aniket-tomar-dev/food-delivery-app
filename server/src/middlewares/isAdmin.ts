import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user?._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(userId);

  if (user?.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

export const protect = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = decoded;
  next();
};
