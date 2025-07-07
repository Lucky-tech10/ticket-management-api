import { Request, Response, NextFunction } from "express";
import { isJwtTokenValid } from "../utils";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { adminId, name, category } = isJwtTokenValid({ token });
    (req as any).admin = { name, adminId, category };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentication invalid" });
  }
};

export default authMiddleware;
