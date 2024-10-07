import React, { useState } from "react";
import { toast } from "react-toastify";
import { backendApi } from "../config";
const TaskForm = ({ token, projects, setTasks }) => {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending"); // New status field
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendApi + "/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ name, project, deadline, priority }),
      });
      if (!response.ok) throw new Error("Failed to add task");
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      setName("");
      setProject("");
      setDeadline("");
      setPriority("Low");
      setStatus("Pending");
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };
  return (
    <div className="ml-0 md:ml-10 m-5 md:m-20 md:mt-2 mt-2 border border-gray-300 shadow-xl p-4 md:p-6 w-full md:w-96 rounded-2xl ">
      <form onSubmit={handleSubmit}>
        <label className="text-lg md:text-xl">Task Name:</label>
        <br />
        <input
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg mb-5 w-full"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
        />

        <label className="text-lg md:text-xl">Project:</label>
        <br />
        <select
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg mb-5 w-full"
          onChange={(e) => setProject(e.target.value)}
          value={project}
          required
        >
          <option value="">Select Project</option>
          {projects && projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.name}
            </option>
          ))}
        </select>

        <label className="text-lg md:text-xl">Deadline:</label>
        <br />
        <input
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg mb-5 w-full"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <label className="text-lg md:text-xl">Priority:</label>
        <br />
        <select
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg mb-5 w-full"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="text-lg md:text-xl"> Status:</label>
        <br />
        <select
          className="border border-black mt-3 md:mt-5 p-3 rounded-lg mb-5 w-full"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          className="mt-6 md:mt-10 font-semibold text-white border border-green-600 bg-green-600 p-3 w-full rounded-lg text-lg md:text-xl"
          type="submit"
        >
          + Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
