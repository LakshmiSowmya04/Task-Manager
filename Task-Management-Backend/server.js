import express from "express";
import projectsRouter from "./routes/project-routes.js";
import tasksRouter from "./routes/task-routes.js";
import healthcheckRouter from "./routes/healthcheck-routes.js";
import authRouter from "./routes/auth-routes.js";
import { PORT } from "./config/env-config.js";
import cors from "cors";
import connectDB from "./db/index.js";
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

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
