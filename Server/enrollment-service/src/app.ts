// src/app.ts
import express from "express";
import dotenv from "dotenv";
import path from "path";
import swaggerUi from "swagger-ui-express";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import swaggerDocs from "../config/swagger";

// Load environment variables
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development" });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/enrollment", enrollmentRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
