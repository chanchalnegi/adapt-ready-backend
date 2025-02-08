import express from "express";
import session from "express-session";
import authRouter from "./routes/authRoutes";
import foodRouter from "./routes/foodRoutes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  next();
});

app.use("/auth", authRouter);
app.use("/dishes", foodRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
