import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Internship Management API",
    description: "API documentation for Internship Management System",
    version: "1.0.0",
  },
  host: "localhost:5000",
  schemes: ["http"],
  basePath: "/api",
};

const outputFile = "./swagger.json"; 
const routes = ["./app.ts"]; 

swaggerAutogen()(outputFile, routes).then(() => {
  console.log("Swagger documentation generated!");
});
