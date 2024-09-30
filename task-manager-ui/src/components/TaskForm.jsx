import React, { useState } from "react";

const TaskForm = ({ projects, setTasks }) => {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!project) {
      setError("Please select a project");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, project, deadline, priority }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create task");
      }

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      setName("");
      setProject("");
      setDeadline("");
      setPriority("Low");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
        className="w-full px-3 py-2 border rounded"
      />
      <select
        onChange={(e) => setProject(e.target.value)}
        value={project}
        className="w-full px-3 py-2 border rounded"
        required
      >
        <option value="">Select Project</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>
            {proj.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <select
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className="w-full px-3 py-2 border rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
