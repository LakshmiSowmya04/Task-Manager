import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ taskCount, setTaskCount }) {
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  return (
    <div>
      {/* Content Section  */}
      <div className="mt-24 text-center">
        <h2 className=" text-2xl sm:text-4xl font-semibold text-gray-800">
          Hello user, you have{" "}
          <span className="text-blue-600">{taskCount}</span> tasks remaining
        </h2>

        <div className="mt-12 space-y-6">
          {/* Projects Button */}
          <Link to="/projects">
            <button
              className={`transition-colors duration-300 text-lg font-medium px-6 py-3 rounded-md shadow-md border-2 ${
                showProjects
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => {
                setShowProjects(true);
                setShowTasks(false);
              }}
            >
              View Your Projects
            </button>
          </Link>

          {/* Tasks Button */}
          <Link to="/tasks">
            <button
              className={`transition-colors duration-300 text-lg font-medium px-6 py-3 rounded-md shadow-md border-2 ${
                showTasks
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
              }`}
              onClick={() => {
                setShowTasks(true);
                setShowProjects(false);
              }}
            >
              View Your Tasks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
