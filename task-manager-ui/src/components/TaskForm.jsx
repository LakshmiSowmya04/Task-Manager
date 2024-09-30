import React, { useState } from 'react';

const TaskForm = ({ projects, setTasks }) => {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, project, deadline, priority }),
    });
    const newTask = await response.json();
    setTasks((prev) => [...prev, newTask]);
    setName('');
    setProject('');
    setDeadline('');
    setPriority('Low');
  };
//hello
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <select onChange={(e) => setProject(e.target.value)} value={project}>
        <option value="">Select Project</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>{proj.name}</option>
        ))}
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
