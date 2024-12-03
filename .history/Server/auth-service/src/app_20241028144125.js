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

// Import Swagger config
const swaggerDocs = require("../config/swagger");

const app = express();
const PORT = config.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: ["http://your-frontend-domain.com"], // Thay thế bằng domain của frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
    credentials: true, // Để truyền cookie, token trong header
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
