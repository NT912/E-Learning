// src/app.ts
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import courseRoutes from "./routes/courseRoutes";
import cors from "cors";
import config from "../config";

import swaggerDocs from "../config/swagger";
const app = express();
const PORT = config.port;

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

app.use(
  cors({
    origin: `*`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/public", express.static(path.resolve("../public")));

// Routes
app.use("/course", courseRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
