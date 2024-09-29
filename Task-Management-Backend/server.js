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
});
