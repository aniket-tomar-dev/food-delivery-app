import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  // console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    // console.log("DECODED TOKEN:", decoded);

    // ✅ EXACT FIX
    (req as any).user = { _id: decoded.id };

    // console.log("REQ.USER SET TO:", (req as any).user);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
