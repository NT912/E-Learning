// app.js
require("module-alias/register.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require('swagger-ui-express');

// Load config project
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });
const config = require("../config");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("~/routes/userRoutes");
const courseRoutes = require("./routes/course/courseRoutes");
const quizzRoutes = require("./routes/quizzRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

// Import Swagger config
const swaggerDocs = require('../config/swagger');

const app = express();
const PORT = config.PORT || 3002;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/quizz", quizzRoutes);
app.use("/exercise", exerciseRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
