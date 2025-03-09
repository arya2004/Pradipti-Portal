import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"; // Import generated Swagger JSON

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authenticate";
import applicationRoutes from "./routes/applicationRoutes";
import institutionRoutes from "./routes/institutionRoutes";
import internshipProgramRoutes from "./routes/internshipProgramRoutes";
import internshipTopicRoutes from "./routes/internshipTopicRoutes";
import mouRoutes from "./routes/mouRoutes";
import stationRoutes from "./routes/stationRoutes";
import studentRoutes from "./routes/studentRoutes";

const app = express();

app.use(express.json());

// Mount API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/internship-programs", internshipProgramRoutes);
app.use("/api/internship-topics", internshipTopicRoutes);
app.use("/api/mous", mouRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/students", studentRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
