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
      <div className=" text-3xl p-3 text-white bg-black"><p className="p-5 font-bold"> ✅ Task Management App</p></div>
     
      <div className="ml-10 mt-60">
      <h2 className="text-4xl">
        Hello user, you have {taskCount} tasks remaining
      </h2>
      <div className="mt-10 border border-black w-max  p-5 ">
        <Link to="/projects"><button className={showProjects?"active":""} onClick={() => {
          setShowProjects(true); setShowTasks(false); }}>Click to view your projects </button></Link></div>
          <br/>

          <div className="mt-10 border border-black w-max  p-5 ">
        <Link className="Links" to="/tasks"><button className={showTasks?"active":""}onClick={() => {
          setShowTasks(true); setShowProjects(false); }}>Click to view your Projects</button></Link></div>
      </div>
      {
        location.pathname === "/tasks" ? <Outlet context={{setTaskCount}} />: <Outlet/>
      }
    </div>
  );
};

export default App;
