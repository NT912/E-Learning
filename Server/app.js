const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const discussionRoutes = require("./routes/discussionRoutes");

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });
const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/payments", paymentRoutes);
app.use("/discussions", discussionRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}/`));
