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
          const response = await fetch("http://localhost:8000/api/v1/projects");
          const data = await response.json();
          setProjects(data.data);
        };
        fetchProjects();
      }, []);
    
      useEffect(() => {
        const fetchTasks = async () => {
          const response = await fetch("http://localhost:8000/api/v1/tasks");
          const data = await response.json();
          console.log(data);
          setTasks(data.data);
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
          className={`p-3 px-10 border text-white mt-10 w-full md:w-96 mb-0 ml-0 md:ml-10 rounded-lg font-semibold text-xl ${
            showTaskForm
              ? "bg-red-400 border-red-900"
              : "bg-blue-500 border-green-500"
          } ${showTaskForm ? "close" : null}`}
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ?(
            <div className="flex">
              {/* Random icon for time being . Change later */}
              <img className="h-5 mt-[5px] mr-3" src="/images/closeicon.png" />
              Close Form
            </div>
          ) : (
            <div className="flex">
              {/* Random icon for time being . Change later */}
              <img className="h-8 mr-3" src="/images/plusIcon.png" /> Add New
              Task
            </div>
          )}
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
