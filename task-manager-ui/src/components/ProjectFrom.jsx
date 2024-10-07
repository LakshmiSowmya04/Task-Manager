import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendApi } from "../config";
const ProjectForm = ({ token, setProjects }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendApi + "/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name, description: desc }),
      });
      if (!response.ok) throw new Error("Failed to add project");
      const newProject = await response.json();
      setProjects((prev) => [...prev, newProject]);
      setName("");
      setDesc("");
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  return (
    <div className="ml-0 md:ml-10 m-5 md:m-20 md:mt-2 mt-2 border border-gray-300 shadow-xl p-4 md:p-6 w-full md:w-96 rounded-2xl ">
      <form className="project-form" onSubmit={handleSubmit}>
        <label className="text-lg md:text-xl">Project Name</label>
        <br />
        <input
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg mb-5 w-full"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
        />
        <br />
        <label className="text-lg md:text-xl">Project Description:</label>
        <br />
        <textarea
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg w-full"
          type="text"
          cols="30"
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter project description"
          required
        />
        <br />
        <button
          className="mt-6 md:mt-10 font-semibold text-white border border-green-600 bg-green-600 p-3 w-full rounded-lg text-lg md:text-xl"
          type="submit"
        >
          + Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
