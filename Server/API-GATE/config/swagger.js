// config/swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 2999;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [
      {
        url: 'https://963b-2405-4802-9644-6b80-3d94-58b9-8f68-f17f.ngrok-free.app/',
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js"], // Đường dẫn tới các file chứa mô tả Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
