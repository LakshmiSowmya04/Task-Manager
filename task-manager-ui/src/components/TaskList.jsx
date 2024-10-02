import React from "react";
import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { backendApi } from "../config";

function TaskList({ token, setTaskCount }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(backendApi + "/api/v1/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProjects(data.data);
    };
    fetchProjects();
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(backendApi + "/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setTasks(data.data);
    };
    fetchTasks();
  }, [token]);
  useEffect(() => {
    setTaskCount(tasks.filter((task) => task.status !== "Completed").length);
  }, [setTaskCount, tasks]);

  return (
    <div className="section tasks-section pt-40 w-full h-full">
      <div className="section2">
        <button
          className={`p-3 px-10 border text-white mt-10 w-full md:w-96 mb-0 ml-0 md:ml-10 rounded-lg font-semibold text-xl ${
            showTaskForm
              ? "bg-red-400 border-red-900"
              : "bg-blue-500 border-green-500"
          } ${showTaskForm ? "close" : null}`}
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          {showTaskForm ? (
            <div className="flex">
              {/* Random icon for time being . Change later */}
              <img
                className="h-5 mt-[5px] mr-3"
                src="/images/closeicon.png"
                alt=""
              />
              Close Form
            </div>
          ) : (
            <div className="flex">
              {/* Random icon for time being . Change later */}
              <img className="h-8 mr-3" src="/images/plusIcon.png" alt="" /> Add
              New Task
            </div>
          )}
        </button>

        {showTaskForm && (
          <TaskForm
            token={token}
            projects={projects}
            setTasks={setTasks}
            setTaskCount={setTaskCount}
          />
        )}
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id}>
              {task.name} - {task.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
