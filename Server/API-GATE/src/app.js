// app.js
require("module-alias/register.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const config = require("../config");

const courseRoutes = require("./routes/course/courseRoutes");

const swaggerDocs = require("../config/swagger");

const app = express();
const PORT = config.port;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/course", courseRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
