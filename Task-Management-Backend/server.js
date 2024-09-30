import express from "express";
import projectsRouter from "./routes/project.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";

import cors from "cors";
import connectDB from "./db/index.js";

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
// connectDB();

const PORT = 8000; // Change the port to 8000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the HTTP link
});

// Our project routes go here
// http://localhost:8000/api/v1/healthcheck

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/tasks", tasksRouter);
