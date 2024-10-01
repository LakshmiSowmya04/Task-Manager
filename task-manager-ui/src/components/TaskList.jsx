import React from 'react'
import { useState, useEffect} from 'react';
import TaskForm from './TaskForm';
import { useOutletContext } from 'react-router-dom';
function TaskList() {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [tasks , setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const { setTaskCount } = useOutletContext(); 
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
    <div className="section tasks-section">
         <div className="section2">
        <button
          className={`toggle-button ${showTaskForm ? "close" : null}`}
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? "Close Form" : "Add Task"}
        </button>
        {showTaskForm && <TaskForm projects={projects} setTasks={setTasks} setTaskCount={setTaskCount}/>}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id}>
              {task.name} - {task.status}
            </li>
          ))}
        </ul>
        </div>
       </div>
  )
}

export default TaskList
