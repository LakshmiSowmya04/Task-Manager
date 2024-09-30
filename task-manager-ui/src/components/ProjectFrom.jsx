import React, { useState } from "react";
// import "./ProjectForm.css";

const ProjectForm = ({ setProjects }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "name":name, "description":desc }),
    });
    const newProject = await response.json();
    setProjects((prev) => [...prev, newProject]);
    setName('');
    setDesc('');
  };

  return (
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

      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
