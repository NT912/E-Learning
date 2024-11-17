// src/app.ts
const express =  require("express");
import path from "path";
import swaggerUi from "swagger-ui-express";
import paymentRoutes from "./routes/paymentRoutes";
import swaggerDocs from "../config/swagger";
// import cors from 'cors';

import config from "../config";

const app = express();
const PORT = config.port || 3000;

// app.use(cors({
//   origin: 'http://localhost:3000',  
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api", paymentRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});
