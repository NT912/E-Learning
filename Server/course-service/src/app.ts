// src/app.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import courseRoutes from "./routes/courseRoutes";
import config from "../config";

// Load config project
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

import swaggerDocs from "../config/swagger"
const app = express();
const PORT = config.port || 3001;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/course", courseRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
