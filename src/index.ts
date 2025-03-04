import express from "express";
import authRouter from "./routes/authRoutes";
import foodRouter from "./routes/foodRoutes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/dishes", foodRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
