import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ taskCount, setTaskCount }) {
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
     
     <div className="flex justify-center items-center w-full p-4 bg-white rounded-lg border border-gray-300">

  {/* Search Box*/}
  <input
    type="text"
    placeholder="Search..."
    className="p-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 mx-72"
  />

  {/* Add Task button on the right */}
  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
        <Link to="/tasklist" className="flex items-center">
          + Add Task
        </Link>
      </button>

</div>

      {/* Content Section */}
      <div className="text-center mt-10 ml-64">
        <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 p-5">
          Hello user, you have <span className="font-bold">{taskCount}</span> tasks remaining
        </h2>
      </div>
    </div>
  );
}
