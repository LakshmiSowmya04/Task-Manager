const express = require("express");
const mongoose = require("mongoose");
const projectsRouter = require("./routes/projects");
const tasksRouter = require("./routes/tasks");
const app = express();

app.use(express.json());
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);

mongoose
  .connect("mongodb://localhost:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
