import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const googleAuthSuccess = (req: Request, res: Response) => {
  const user = req.user as any;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.redirect(`http://localhost:5173/login-success?token=${token}`);
};
