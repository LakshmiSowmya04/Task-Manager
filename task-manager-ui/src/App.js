import React, { useEffect, useState } from "react";
import ProjectForm from "./components/ProjectFrom";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/projects");
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // i am adding this

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      console.log(data);
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task Management App</h1>
      <ProjectForm setProjects={setProjects} />
      <TaskForm projects={projects} setTasks={setTasks} />
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
