import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import loginSchema from "../schemas/loginSchema";
import { credentials, jwtSecret } from "../config";

export const login = (req: Request, res: Response): void => {
  // Validate the request body
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    res.status(400).json({ errors: error.details.map((err) => err.message) });
    return;
  }

  const { email, password } = value;

  // Authenticate user
  if (email === credentials.username && password === credentials.password) {
    // User authenticated, generate a JWT
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
