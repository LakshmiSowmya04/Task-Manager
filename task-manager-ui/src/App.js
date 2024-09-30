import React, { useEffect, useState } from "react";
import ProjectForm from "./components/ProjectFrom";
import TaskForm from "./components/TaskForm";
import "./App.css"; // Main CSS
const App = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0); // State for the task count
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showProjects, setShowProjects] = useState(true);
  const [showTasks, setShowTasks] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/projects");
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      console.log(data);
      setTasks(data);
    };
    fetchTasks();
  }, []);

  useEffect(() => {

    setTaskCount(tasks.filter((task) => task.status !== "Completed").length);
  }, [tasks])

  return (
    <div className="app-container">
      <h1 className="Appheader">Task Management App</h1>
      <h2 className="greeting">
        Hello user_name, you have {taskCount} tasks remaining
      </h2>
      <div className="container">
        <button className={showProjects?"active":""} onClick={() => {
          setShowProjects(true); setShowTasks(false); }}>Projects</button>
        <button className={showTasks?"active":""}onClick={() => {
          setShowTasks(true); setShowProjects(false); }}>Tasks</button>
        
      </div>
      {/* Projects Section*/}
      {showProjects && 
       <div className="section projects-section">
        <div className="section2">
        <button
          className={`toggle-button ${showProjectForm ? "close" : null}`}
          onClick={() => setShowProjectForm(!showProjectForm)}
        >
          {showProjectForm ? "Close Form" : "Add Project"}
        </button>
        {showProjectForm && <ProjectForm setProjects={setProjects} />}
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              {project.name}
              <span className="project-description">{project.description}</span>
            </li>
          ))}
        </ul>
        </div>
       </div>
     }

      {/* Tasks Section*/}
      {showTasks &&
       <div className="section tasks-section">
         <div className="section2">
        <button
          className={`toggle-button ${showTaskForm ? "close" : null}`}
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? "Close Form" : "Add Task"}
        </button>
        {showTaskForm && <TaskForm projects={projects} setTasks={setTasks} setTaskCount={setTaskCount} />}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id}>
              {task.name} - {task.status}
            </li>
          ))}
        </ul>
        </div>
       </div>
      } 
    </div>
  );
};

export default App;
