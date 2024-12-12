// app.js
require("module-alias/register.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Load config project
// const envFile =
//   process.env.NODE_ENV === "production"
//     ? ".env.production"
//     : ".env.development";
// dotenv.config({ path: envFile });

const config = require("../config");

// Import routes
const courseRoutes = require("./routes/course/courseRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const profileRoutes = require("./routes/profile/profileRoutes");

// Import Swagger config
const swaggerDocs = require("../config/swagger");

const app = express();
const PORT = config.PORT || 2999;
// app.use(cors());

app.use(
  cors({
    origin: "*", // Cho phép tất cả nguồn truy cập
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/course", courseRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/api/discussion", discussionRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
