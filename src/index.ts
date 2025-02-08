// src/app.ts
import express from "express";
import session from "express-session";
import authRouter from "./routes/authRoutes";
import foodRouter from "./routes/foodRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authRouter);
app.use("/dishes", foodRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
