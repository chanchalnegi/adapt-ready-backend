// config/index.ts
import dotenv from "dotenv";

dotenv.config();

export const credentials = {
  username: process.env.USERNAME || "defaultUsername",
  password: process.env.PASSWORD || "defaultPassword",
};

export const jwtSecret = process.env.JWT_SECRET || "defaultJWTSecret";
