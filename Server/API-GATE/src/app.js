const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const config = require('../config/index');

// Import routes
const courseRoutes = require('./routes/course/courseRoutes');

// Import Swagger config
const swaggerDocs = require('../config/swagger');

const app = express();
const PORT = config.PORT || 2999;

// Cấu hình môi trường
dotenv.config();

// Cấu hình CORS
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Cấu hình các middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Định tuyến
app.use('/course', courseRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
  console.log(`API DOC: http://localhost:${PORT}/api-docs`);
});
