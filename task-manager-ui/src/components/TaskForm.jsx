import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TaskForm = ({ projects, setTasks, setTaskCount}) => {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending'); // New status field

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, project, deadline, priority, status }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      setName('');
      setProject('');
      setDeadline('');
      setPriority('Low');
      setStatus('Pending');
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>Task Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter task name"
        required
      />
      
      <label>Project:</label>
      <select onChange={(e) => setProject(e.target.value)} value={project} required>
        <option value="">Select Project</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>{proj.name}</option>
        ))}
      </select>

      <label>Deadline:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <label>Priority:</label>
      <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      
      <label>Status:</label>
      <select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
     <ToastContainer />
    </>
  );
};

export default TaskForm;
