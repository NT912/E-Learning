// app.js
require("module-alias/register.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Load config project
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });
const config = require("../config");

// Import routes
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Import Swagger config
const swaggerDocs = require("../config/swagger");

const app = express();
const PORT = config.port;
app.use(
  cors({
    origin: "http://localhost:2999",
    methods: "GET,POST,PUT,DELETE, PATCH",
    credentials: true,
  })
);
// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/send-notification", notificationRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
