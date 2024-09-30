import React, { useState } from 'react';

const ProjectForm = ({ setProjects }) => {
  const [name, setName] = useState('');
  const [desc,setDesc]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newProject = await response.json();
    setProjects((prev) => [...prev, newProject]);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
        required
      />
//hello
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Project Description"
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
