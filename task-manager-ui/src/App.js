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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        Hello user name, You have {tasks.length} tasks remaining
      </h1>

      <div className="flex mb-6">
        <button className="flex-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded-l-lg">
          Projects
        </button>
        <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-r-lg">
          Tasks
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <ProjectForm setProjects={setProjects} />
          <ul className="mt-4">
            {projects.map((project) => (
              <li key={project._id} className="py-2 border-b">
                {project.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <TaskForm projects={projects} setTasks={setTasks} />
          <ul className="mt-4">
            {tasks.map((task) => (
              <li key={task._id} className="py-2 border-b">
                {task.name} -{" "}
                <span className="text-blue-500">{task.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
