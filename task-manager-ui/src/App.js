import React, { useEffect, useState } from "react";
import { Outlet , Link, useLocation } from "react-router-dom";
import "./App.css"; // Main CSS
const App = () => {
  const [taskCount, setTaskCount] = useState(0); // State for the task count
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const location = useLocation();

  return (
    <div className="app-container">

      {/* To test TailwindCSS . Update styles later */}
      <h1 className="ml-10 text-3xl p-3 text-red-500">Task Management App</h1>
      <h2 className="greeting">
        Hello user_name, you have {taskCount} tasks remaining
      </h2>
      <div className="container">
        <Link className="Links" to="/projects"><button className={showProjects?"active":""} onClick={() => {
          setShowProjects(true); setShowTasks(false); }}>Projects</button></Link>
        <Link className="Links" to="/tasks"><button className={showTasks?"active":""}onClick={() => {
          setShowTasks(true); setShowProjects(false); }}>Tasks</button></Link>
      </div>
      {
        location.pathname === "/tasks" ? <Outlet context={{setTaskCount}} />: <Outlet/>
      }
    </div>
  );
};

export default App;
