import Task from "../models/task.models.js"; 
import { ApiError } from "../utils/ApiError.js"; 
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { asyncHandler } from "../utils/asyncHandler.js"; 

// Controller for creating a task
export const createTask = asyncHandler(async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json(new ApiResponse(201, task, "Task created successfully")); 
  } catch (error) {
    throw new ApiError(400, "Error creating task"); 
  }
});

// Controller for fetching all tasks
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("project"); 
  res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});
