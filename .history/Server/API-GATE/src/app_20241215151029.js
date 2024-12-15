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
const discussionRoutes = require("./routes/discussion/discussionRoutes");
// const enrollmentRoute = require("./routes/enrollment/enrollmentRoute");

// Import Swagger config
const swaggerDocs = require("../config/swagger");

const app = express();
const PORT = config.PORT || 2999;
// app.use(cors());

// Cấu hình CORS
app.use(
  cors({
    origin: "*",
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
// app.use("/enrollment", enrollmentRoute);
app.use("/profile", profileRoutes);
app.use("/api/discussion", discussionRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
