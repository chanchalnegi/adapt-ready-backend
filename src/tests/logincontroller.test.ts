import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import * as authController from "../controllers/authController";
import { credentials, jwtSecret } from "../config";

// Mock JWT
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Define routes to be tested
app.post("/login", authController.login);
app.post("/logout", authController.logout);

describe("Authentication Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** LOGIN */
  it("should return a JWT token for valid credentials", async () => {
    const mockToken = "mocked.jwt.token";
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const response = await request(app)
      .post("/login")
      .send({ email: credentials.username, password: credentials.password });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBe(mockToken);
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "wrong@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 400 for missing email or password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  /** LOGOUT */
  it("should clear the authentication cookie on logout", async () => {
    const response = await request(app).post("/logout");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
    expect(response.headers["set-cookie"]).toBeDefined();
  });
});
