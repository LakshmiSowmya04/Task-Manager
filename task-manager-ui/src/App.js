import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";

export default function App() {
  const [taskCount, setTaskCount] = useState(0);
  return (
    <>
      <Dashboard taskCount={taskCount} setTaskCount={setTaskCount} />
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/tasks" element={<TaskList setTaskCount={setTaskCount} />} />
      </Routes>
    </>
  );
}
