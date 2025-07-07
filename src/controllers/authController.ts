import { Request, Response } from "express";
import { prisma } from "../db/connectDB";
import {
  hashPassword,
  comparePassword,
  createJWT,
  createTokenUser,
} from "../utils";

const register = async (req: Request, res: Response) => {
  const { name, email, password, category } = req.body;
  if (!name || !email || !password || !category) {
    return res.status(400).json({ error: "Please provide all values" });
  }
  const existingAdminEmail = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdminEmail) {
    return res.status(400).json({
      errorMsg: `⚠️ Admin with email ${email} already exists.`,
    });
  }

  const hashedPassword = await hashPassword(password);
  if (!hashedPassword) {
    return res.status(500).json({ error: "Error hashing password" });
  }

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashedPassword,
      category,
    },
  });

  const tokenUser = createTokenUser(admin);

  const token = createJWT({ payload: tokenUser });

  res.status(201).json({ admin: tokenUser, token });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide all values" });
  }
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isPasswordValid = await comparePassword(password, admin.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const tokenUser = createTokenUser(admin);

  const token = createJWT({ payload: tokenUser });

  res
    .status(200)
    .json({ admin: tokenUser, token, message: "Logged In successfully" });
};

const logout = async (req: Request, res: Response) => {
  // For JWT-based auth, logout is handled on the client by deleting the token.
  // Optionally, you can instruct the client to remove the token.
  res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, logout };
