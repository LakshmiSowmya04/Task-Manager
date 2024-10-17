import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import Login from "./components/Login";
import LoggedOut from "./components/LoggedOut";
import Register from "./components/Signup";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [taskCount, setTaskCount] = useState(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className="min-h-screen flex min-w-full bg-gray-light w-full h-screen  ">
      
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} />}
        />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard
                taskCount={taskCount}
                token={token}
                setToken={setToken}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            token ? (
              <ProjectList setToken={setToken} token={token} />
            ) : (
              <LoggedOut />
            )
          }
        />
        <Route
          path="/tasks"
          element={
            token ? (
              <TaskList
                setToken={setToken}
                token={token}
                setTaskCount={setTaskCount}
              />
            ) : (
              <LoggedOut />
            )
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
