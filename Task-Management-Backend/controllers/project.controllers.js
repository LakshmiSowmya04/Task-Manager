import Project from "../models/project.models.js"; 
import { ApiError } from "../utils/ApiError.js"; 
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { asyncHandler } from "../utils/asyncHandler.js"; 

// Controller for creating a project
export const createProject = asyncHandler(async (req, res) => {
  const project = new Project(req.body);
  console.log(req.body);
  try {
    await project.save();
    res.status(201).json(new ApiResponse(201, project, "Project created successfully")); 
  } catch (error) {
    throw new ApiError(400, "Error creating project"); 
  }
});

export const gforetProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully")); 
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});
