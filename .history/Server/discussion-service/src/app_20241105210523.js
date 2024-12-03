require("module-alias/register");
const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Load environment variables
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

// Import routes
const discussionRoutes = require("./routes/discussionRoutes");

// Import Swagger configuration
const swaggerDocs = require("../config/swagger");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/discussions", discussionRoutes); // Cấu hình route cho thảo luận

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send({ error: "Endpoint not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
