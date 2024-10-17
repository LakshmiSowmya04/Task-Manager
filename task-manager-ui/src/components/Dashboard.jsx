import React, { useState } from "react";
import { Link } from "react-router-dom";
import Add_icon from ".././assets/icons/add-icon.svg";
import Default_user_icon from ".././assets/icons/default-user-icon.svg";
import Navbar from "./Navbar";

export default function Dashboard({
  taskCount,
  setTaskCount,
  token,
  setToken,
}) {
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  return (
    <>
      <div className="p-0 sm:p-2 flex w-full gap-3">
        <Navbar token={token} setToken={setToken} />
        <div className="min-h-screen flex flex-col w-full items-center bg-transparent">
          <div className="flex justify-between items-center w-full p-2 bg-white rounded-3xl border border-gray-300">
            {/* Search Box*/}
            <div className="flex min-w-[50%]">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 border placeholder:text-xs border-gray-300 bg-gray-medium rounded-3xl w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>

            {/* Add Task button on the right */}
            <div className="flex gap-4">
              <button className="bg-primary text-white py-1 px-2 text-sm rounded-xl border-black-all hover:bg-blue-600 transition duration-300">
                <Link to="/tasklist" className="flex items-center gap-1">
                  <img
                    src={Add_icon}
                    className="aspect-square w-6"
                    alt="add icon"
                  />
                  <span>Add Task</span>
                </Link>
              </button>

              <div className="rounded-full flex cursor-pointer">
                <img
                  src={Default_user_icon}
                  className="aspect-square w-9"
                  alt="user icon"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-semibold text-gray-800 p-5">
              Hello user, you have{" "}
              <span className="font-bold">{taskCount}</span> tasks remaining
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
