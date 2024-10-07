import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectFrom";
import { backendApi } from "../config";
import { Link } from "react-router-dom";

function ProjectList({ token }) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(backendApi + "/api/v1/projects", {
        method: "GET",
        credentials: 'include',
        headers: {
          Authorization: token,
        },
      }).catch(err => console.log(err.data.message));
      const data = await response.json();
      setProjects(data.data);
    };
    fetchProjects();
  }, [token]);
  return (
    <div className="md:px-10 mt-32 px-5 section projects-section w-full h-full">
      <div className="md:flex justify-between items-center">

      <button
        className={`p-3 px-10 border text-white mt-10 w-full md:w-96 mb-0 ml-0 md:ml-10 rounded-lg font-semibold text-xl ${
          showProjectForm
            ? "bg-red-400 border-red-900"
            : "bg-blue-500 border-green-500"
        } ${showProjectForm ? " close" : ""} transition-all duration-300`}
        onClick={() => setShowProjectForm(!showProjectForm)}
      >
        {showProjectForm ? (
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
            New Project
          </div>
        )}
      </button>
      {/* added a button to go to dashboard */}
      <button className="p-3 px-10 border text-white bg-black mt-10 w-full md:w-96 md:mr-10 rounded-lg font-semibold text-xl">
        <Link to="/dashboard">
        Go back to Dashboard 
        </Link>
      </button>
      </div>

      {showProjectForm && (
        <ProjectForm token={token} setProjects={setProjects} />
      )}
      {/* styled project list */}
      <ul className="md:pl-10 md:mt-4 mt-8 md:flex flex-wrap project-list">
        {projects && projects.map((project) => (
          <div
            key={project._id}
            className="project-item md:max-w-[30%] h-44 rounded overflow-y-auto shadow-lg m-4 bg-white"
          >
            <div className="px-6 py-4">
              <p className="font-bold text-xl mb-2">{project.name}</p>
              <p className="text-gray-700 text-base">{project.description}</p>
            </div>
          </div>
         
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
