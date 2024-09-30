import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProjectForm = ({ setProjects }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: desc }),
      });
      if (!response.ok) throw new Error('Failed to add project');
      const newProject = await response.json();
      setProjects((prev) => [...prev, newProject]);
      setName('');
      setDesc('');
      toast.success('Project added successfully!');
    } catch (error) {
      toast.error('Failed to add project');
    }
  };


  return (
    <>
    <form className="project-form" onSubmit={handleSubmit}>
      <label>Project Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter project name"
        required
      />

      <label>Project Description:</label>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter project description"
        required
      />

      <button className="submit" type="submit">Add Project</button>
    </form>
    <ToastContainer/>
    </>
  );
};

export default ProjectForm;
