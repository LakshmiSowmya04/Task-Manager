import express from "express";
import projectsRouter from "./routes/project.js";
import tasksRouter from "./routes/task.js";
import healthcheckRouter from "./routes/health-check.js";
import authRouter from "./routes/auth.js";
import { PORT } from "./config/env-config.js";
import cors from "cors";
import connectDB from "./db/index.js";

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the HTTP link
});

// Our project routes go here
// http://localhost:5000/api/v1/healthcheck

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/user", authRouter);
