import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Internship Management API",
      version: "1.0.0",
      description: "API documentation for Internship Management System",
    },
    servers: [
      {
        url: "http://localhost:3000/api", 
      },
    ],
  },
  apis: ["./routes/*.ts"], // Path to your route files
};

// Initialize Swagger docs
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Function to setup Swagger UI
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger UI available at: http://localhost:3000/api-docs");
};
