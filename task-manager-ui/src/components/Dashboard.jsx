import React, { useState } from "react";
import { Link } from "react-router-dom";
import Add_icon from "../assets/icons/add-icon.svg";
import Default_user_icon from "../assets/icons/default-user-icon.svg";
import Navbar from "./Navbar";

export default function Dashboard({ taskCount, setTaskCount, token, setToken }) {
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
      {/* Sidebar */}
      <Navbar token={token} setToken={setToken} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 items-center py-6 px-4 sm:px-8">
        {/* Header / Search Section */}
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-3xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
          
          {/* Search Input */}
          <div className="flex w-full sm:w-1/2 items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="bg-transparent flex-1 outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Add Task Button */}
            <Link
              to="/tasklist"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
            >
              <img src={Add_icon} className="w-5 h-5" alt="Add" />
              <span>Add Task</span>
            </Link>

            {/* User Avatar */}
            <div className="relative group cursor-pointer">
              <img
                src={Default_user_icon}
                className="w-10 h-10 rounded-full border-2 border-blue-400 hover:scale-105 transition-transform"
                alt="user"
              />
              {/* Dropdown Placeholder */}
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ul className="text-sm text-gray-700 dark:text-gray-200">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="w-full max-w-6xl mt-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 dark:text-gray-100">
            👋 Hello <span className="text-blue-600 dark:text-blue-400">User</span>,
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            You currently have{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {taskCount}
            </span>{" "}
            tasks remaining. Let's get things done!
          </p>
        </div>

        {/* Placeholder Section (Future content) */}
        <div className="w-full max-w-6xl mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Dashboard Cards */}
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Ongoing Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Keep track of your current work.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Recent Tasks
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Quickly view recently created or updated tasks.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Stay updated with project activity and task changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
