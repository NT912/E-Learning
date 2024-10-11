import express from "express";
import path from "path";
import dotenv from "dotenv";
// import { authRoutes } from "~/src/routes/authRoutes";
// import { userRoutes } from "~/src/routes/userRoutes";
// import { courseRoutes } from "~/src/routes/courseRoutes";
// import { paymentRoutes } from "~/src/routes/paymentRoutes";
// import { discussionRoutes } from "~/src/routes/discussionRoutes";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });
const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`Server running: http://localhost:${PORT}/`)
);
