<<<<<<< HEAD
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"

import projectsRouter from "./routes/project.js"
import tasksRouter from "./routes/tasks.js"
import userRouter from "./routes/user.js"

const app = express();

dotenv.config();
const PORT=process.env.PORT;
const CONNECTION_URL=process.env.CONNECTION_URL

app.use(express.json());
app.use(cors());
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);
app.use("/user", userRouter);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
=======
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
>>>>>>> main
});

// Our project routes go here
// http://localhost:8000/api/v1/healthcheck

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/tasks", tasksRouter);
